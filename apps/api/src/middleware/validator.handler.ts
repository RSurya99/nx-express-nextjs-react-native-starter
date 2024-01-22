const validatorHandler = (schema, req, res, next) => {
  const { error } = schema.safeParse(req.body);
  if (error) {
     res.status(400).json({
        data: {},
        meta: {
          status: 400,
          message: error.issues.map(issue => `${issue.path.join(',')} is ${issue.message}`)
        }
      });
      return;
  }
  next();
};

export default validatorHandler;
