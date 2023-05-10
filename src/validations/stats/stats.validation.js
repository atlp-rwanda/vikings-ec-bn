import moment from "moment";

export const statsValidation = async (req, res, next) => {
  const start = req.query.start;
  const end = req.query.end;
  const include = req.query.include;

  const allowedValues = ["expired", "sales","wishes", "product-created"];
  const includeValues = include ? include.split(",") : [];

  if (!start || !end ) {
    return res
      .status(400)
      .json({ error: "Missing required query parameter(s)." });
  }

  const startDate = moment(start, "YYYY-MM-DD", true);
  const endDate = moment(end, "YYYY-MM-DD", true);

  if (
    !startDate.isValid() ||
    !endDate.isValid() ||
    endDate.isBefore(startDate)
  ) {
    return res.status(400).json({ error: "Invalid or out-of-range date(s)." });
  }

  if (!includeValues.every((value) => allowedValues.includes(value))) {
    return res.status(400).json({ error: "Invalid include value(s)." });
  }

  next();
};
