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
import { optionRepository } from '../repositories/option.repository';
import { courseRepository } from '../repositories/course.repository';

export class QuizService {
  async createQuiz(quizData: Partial<Quiz>, questions: any[]): Promise<Quiz> {
    const course = await courseRepository.findOne({ where: { courseId: quizData.course?.courseId } });
    if (!course) {
      throw new Error('Course not found');
    }

    const quiz = QuizRepository.create({
      quizName: quizData.quizName,
      description: quizData.description,
      totalmarks: quizData.totalmarks,
      course: course // ✅ Set course relation properly
    });

    const savedQuiz = await QuizRepository.save(quiz);

    for (const q of questions) {
      const question = questionRepository.create({
        questionText: q.questionText,
        correctOptionId: q.correctOptionId,
        quiz: savedQuiz
      });

      const savedQuestion = await questionRepository.save(question);

      for (const opt of q.options) {
        const option = optionRepository.create({
          optionText: opt.optionText,
          question: savedQuestion
        });
        await optionRepository.save(option);
      }
    }

    return savedQuiz;
  }

  async getQuizByCourseId(courseId: number): Promise<Quiz[]> {
    return await QuizRepository.find({ where: { course: { courseId } }, relations: ['questions', 'questions.options'] });
  }

  async submitQuiz(
    attemptData: { userId: number; quizId: number },
    answers: { questionId: number; selectedOptionId: number }[],
  ): Promise<{ score: number }> {
    const { userId, quizId } = attemptData;

    let score = 0;

    for (const answer of answers) {
      // Fetch the correct option for this question
      const correctOption = await optionRepository.findOne({
        where: {
          question: { questionId: answer.questionId },
          isCorrect: true,
        },
        relations: ['question'], // Ensure relation is loaded
      });

      // Compare selectedOptionId with the correct one
      if (
        correctOption &&
        correctOption.optionId === answer.selectedOptionId
      ) {
        score++;
      }
    }

    // Create and save the attempt
    const attempt = QuizAttemptRepository.create({
      userId,
      quizId,
      score,
      attemptDate: new Date(), // Add date explicitly
    });

    await QuizAttemptRepository.save(attempt);

    return { score };
  }
  async getResultsByUserId(userId: number): Promise<Result[]> {
    return await ResultRepository.find({ where: { user: { userId } }, relations: ['quiz', 'course'] });
  }
}



// async submitQuiz(attemptData: Partial<QuizAttempt>, answers: Partial<Answer>[]): Promise<QuizAttempt> {
  //   attemptData.score = 0;
  //   attemptData.attemptDate=new Date();

  //   const attempt = QuizAttemptRepository.create(attemptData);
  //   const savedAttempt = await QuizAttemptRepository.save(attempt);

  //   let score = 0;

  //   for (const answerData of answers) {
  //     const answer = answerRepository.create({ ...answerData, attempt: savedAttempt });
  //     await answerRepository.save(answer);

  //     // Check if the answer is correct
  //     const question = await questionRepository.findOne({ where: { questionId: answer.questionId } });

  //   //   const question = await questionRepository.findOne(answer.questionId);
  //   //   const question = await questionRepository.find({where:{answers.questionId}});
  //     if (question && question.correctOptionId === answer.selectedOptionId) {
  //       score += 1; // Increment score for each correct answer
  //     }
  //   }

  //   // Save the result
  //   const result = ResultRepository.create({
  //       score,
  //       //course: { courseId: attemptData.courseId },
  //       quiz: { quizId: attemptData.quizId },
  //       user: { userId: attemptData.userId },
  //       attemptDate: new Date()
  //   });
  //   await ResultRepository.save(result);

  //   // Update the attempt with the score
  //   savedAttempt.score = score;
  //   await QuizAttemptRepository.save(savedAttempt);

  //   return savedAttempt;
  // }