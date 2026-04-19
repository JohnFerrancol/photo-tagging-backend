import { body } from 'express-validator';

const newGuessValidator = [
  body('characterName')
    .trim()
    .notEmpty()
    .withMessage('Character Name is required'),

  body('x')
    .notEmpty()
    .withMessage('X value is required')
    .isFloat()
    .withMessage('X must be a float'),

  body('y')
    .notEmpty()
    .withMessage('Y value is required')
    .isFloat()
    .withMessage('Y must be a float'),

  body('sessionId')
    .notEmpty()
    .withMessage('Session ID is required')
    .isInt()
    .withMessage('Session ID must be an integer'),
];

export default newGuessValidator;
