import { body } from 'express-validator';

const finishGameValidator = [
  body('sessionId')
    .notEmpty()
    .withMessage('Session ID is required')
    .isInt()
    .withMessage('Session ID must be an integer'),

  body('playerName')
    .notEmpty()
    .withMessage('Player name is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Player name must be between 2 and 30 characters'),

  body('clientEndTime')
    .notEmpty()
    .withMessage('End Time is required')
    .isISO8601()
    .withMessage('End Time is in the wrong datatype'),
];

export default finishGameValidator;
