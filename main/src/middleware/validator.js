const { validationResult } = require("express-validator");

// 익스프레스 유효성 검사기
exports.validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}