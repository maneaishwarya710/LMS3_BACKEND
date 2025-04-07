import { Request, Response } from 'express';
import { QuizService } from '../services/quiz.service';

const quizService = new QuizService();

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { quizData, questions } = req.body;

    // Validate input
    if (!quizData || !questions || !Array.isArray(questions)) {
      res.status(400).json({ message: 'Invalid input: quizData and questions are required' });
    }

    const quiz = await quizService.createQuiz(quizData, questions);
    console.log("In createQuiz controller:", quiz);

    res.status(201).json(quiz);
  } catch (error) {
    console.error(`Error creating quiz:`, error);
    res.status(500).json({ message: 'Error creating quiz', error });
  }
};

export const getQuizByCourseId = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.courseId);

    // Validate courseId
    if (isNaN(courseId)) {
      res.status(400).json({ message: 'Invalid courseId parameter' });
    }

    const quizzes = await quizService.getQuizByCourseId(courseId);
    console.log("In getQuizByCourseId controller:", quizzes);

    res.status(200).json(quizzes);
  } catch (error) {
    console.error(`Error retrieving quizzes for courseId ${req.params.courseId}:`, error);
    res.status(500).json({ message: 'Error retrieving quizzes', error });
  }
};


export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const { attemptData, answers } = req.body;
    const attempt = await quizService.submitQuiz(attemptData, answers);
    res.status(201).json(attempt);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz', error });
  }
};

export const getResultsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const results = await quizService.getResultsByUserId(userId);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving results', error });
  }
}





