import { getRepository } from 'typeorm';
import { Quiz } from '../entities/quiz';
import { Question } from '../entities/question';
import { questionRepository } from '../repositories/question.repository';
import { QuizRepository } from '../repositories/quiz.repository';
import { ResultRepository } from '../repositories/result.repository';
import { QuizAttemptRepository } from '../repositories/quizAttempt.repository';
import { Answer } from '../entities/answer';
import { QuizAttempt } from '../entities/quizAttempt';
import { answerRepository } from '../repositories/answer.repository';
import { Result } from '../entities/result';

export class QuizService {
    async createQuiz(quizData: Partial<Quiz>, questions: Partial<Question>[]): Promise<Quiz> {
    const quiz = QuizRepository.create(quizData);
    const savedQuiz = await QuizRepository.save(quiz);

    for (const questionData of questions) {
      const question = questionRepository.create({ ...questionData, quiz: savedQuiz });
      await questionRepository.save(question);
    }

    return savedQuiz;
  }

  async getQuizByCourseId(courseId: number): Promise<Quiz[]> {
    return await QuizRepository.find({ where: { course: { courseId } }, relations: ['questions', 'questions.options'] });
  }

  async submitQuiz(attemptData: Partial<QuizAttempt>, answers: Partial<Answer>[]): Promise<QuizAttempt> {
    attemptData.score = 0;

    const attempt = QuizAttemptRepository.create(attemptData);
    const savedAttempt = await QuizAttemptRepository.save(attempt);

    let score = 0;

    for (const answerData of answers) {
      const answer = answerRepository.create({ ...answerData, attempt: savedAttempt });
      await answerRepository.save(answer);

      // Check if the answer is correct
      const question = await questionRepository.findOne({ where: { questionId: answer.questionId } });

    //   const question = await questionRepository.findOne(answer.questionId);
    //   const question = await questionRepository.find({where:{answers.questionId}});
      if (question && question.correctOptionId === answer.selectedOptionId) {
        score += 1; // Increment score for each correct answer
      }
    }

    // Save the result
    const result = ResultRepository.create({
        score,
        //course: { courseId: attemptData.courseId },
        quiz: { quizId: attemptData.quizId },
        user: { userId: attemptData.userId },
        attemptDate: new Date()
    });
    await ResultRepository.save(result);

    // Update the attempt with the score
    savedAttempt.score = score;
    await QuizAttemptRepository.save(savedAttempt);

    return savedAttempt;
  }

  async getResultsByUserId(userId: number): Promise<Result[]> {
    return await ResultRepository.find({ where: { user: { userId } }, relations: ['quiz', 'course'] });
  }


}



