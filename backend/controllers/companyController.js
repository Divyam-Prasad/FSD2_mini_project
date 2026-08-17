const Company = require('../models/Company');

// @desc    Create or update company profile
// @route   POST /api/companies
// @access  Private/Employer
const createOrUpdateCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;
    let logo = req.file ? `/uploads/${req.file.filename}` : undefined;

    let company = await Company.findOne({ owner: req.user._id });

    if (company) {
      company.companyName = companyName || company.companyName;
      company.description = description !== undefined ? description : company.description;
      company.website = website !== undefined ? website : company.website;
      company.location = location !== undefined ? location : company.location;
      if (logo) company.logo = logo;

      await company.save();
      return res.json({ success: true, message: 'Company updated', data: company });
    }

    company = await Company.create({
      companyName,
      description: description || '',
      website: website || '',
      location: location || '',
      logo: logo || '',
      owner: req.user._id,
    });

    res.status(201).json({ success: true, message: 'Company created', data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current employer's company
// @route   GET /api/companies/my
// @access  Private/Employer
const getMyCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ owner: req.user._id });
    res.json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate('owner', 'name email');
    res.json({ success: true, count: companies.length, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrUpdateCompany,
  getMyCompany,
  getAllCompanies,
};
