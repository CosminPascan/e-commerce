const { body } = require('express-validator')

const perfumeValidationRules = [
    body('name', 'Name must be at least 3 characters long!').isLength({ min: 3 }).trim(),
    body('brand', 'Brand must be at least 3 characters long!').isLength({ min: 3 }).trim(),
    body('type').notEmpty().withMessage('Type is required!'),
    body('category').notEmpty().withMessage('Category is required!'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number!'),
    body('stock').isFloat({ min: 0 }).withMessage('Stock must be a positive number!'),
]

module.exports = perfumeValidationRules
