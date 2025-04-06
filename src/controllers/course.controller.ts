import { Request, Response } from 'express';
import { CourseService } from '../services/course.service';

const courseService = new CourseService();

export const getAllCourses = async (req: Request, res: Response) => {
    try {
      const courses = await courseService.getAllCourses();
      console.log("In getAllCourses controller", courses);
      
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving courses', error });
    }
  };
  
