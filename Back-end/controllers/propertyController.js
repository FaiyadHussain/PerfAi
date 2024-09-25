const Property = require("../models/propertyModel");

async function createProperty(req, res) {
  try {
    const newproperty = new Property(req.body);
    await newproperty.save();
    res.status(200).json(newproperty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllProperties(req, res) {
  const property = await Property.find();
  res.json(property);
}

module.exports = { createProperty, getAllProperties };
