export const validatePagination = async (req, res, next) => {
    const {
        limit,
        page
    } = req.query;
    if (limit && !/^[0-9\s]+$/.test(limit)) {
        return res.status(400).json({ error: 'Limit should be a number' });
    }
    if (page && !/^[0-9\s]+$/.test(page)) {
        return res.status(400).json({ error: 'Page should be a number' });
    }

    next();
};

