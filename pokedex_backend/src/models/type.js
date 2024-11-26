const typeQueries = {
    getAll: 'SELECT * FROM types',
    getByID: 'SELECT * FROM types WHERE id = ?',
    getByTypeName: 'SELECT * FROM types WHERE type = ?',
    createType: 'INSERT INTO types (type) VALUES (?)',
    updateType: 'UPDATE types SET type = ? WHERE id = ?',
    deleteType: 'DELETE FROM types WHERE id = ?',
};

module.exports = { typeQueries };
