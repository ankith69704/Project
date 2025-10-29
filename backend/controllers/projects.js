const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

// @desc      Get all projects
// @route     GET /api/v1/projects
// @access    Private/Admin
exports.getProjects = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single project
// @route     GET /api/v1/projects/:id
// @access    Private/Admin
exports.getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ success: false, msg: 'Project not found' });
  }

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc      Upload photo for project
// @route     PUT /api/v1/projects/:id/photo
// @access    Private/Admin
exports.projectPhotoUpload = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ success: false, msg: 'Project not found' });
  }

  // Make sure user is project owner
  if (project.user.toString() !== req.user.id && req.user.role !== 'Admin') {
    return res.status(401).json({ success: false, msg: 'Not authorized to update this project' });
  }

  if (!req.files) {
    return res.status(400).json({ success: false, msg: 'Please upload a file' });
  }

  const images = [];
  for (const file of req.files) {
    images.push(file.path);
  }

  await Project.findByIdAndUpdate(req.params.id, { images });

  res.status(200).json({
    success: true,
    data: images
  });
});

// @desc      Create project
// @route     POST /api/v1/projects
// @access    Private/Admin
exports.createProject = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const project = await Project.create(req.body);

  res.status(201).json({
    success: true,
    data: project
  });
});

// @desc      Update project
// @route     PUT /api/v1/projects/:id
// @access    Private/Admin
exports.updateProject = asyncHandler(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ success: false, msg: 'Project not found' });
  }

  // Make sure user is project owner
  if (project.user.toString() !== req.user.id && req.user.role !== 'Admin') {
    return res.status(401).json({ success: false, msg: 'Not authorized to update this project' });
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc      Delete project
// @route     DELETE /api/v1/projects/:id
// @access    Private/Admin
exports.deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ success: false, msg: 'Project not found' });
  }

  // Make sure user is project owner
  if (project.user.toString() !== req.user.id && req.user.role !== 'Admin') {
    return res.status(401).json({ success: false, msg: 'Not authorized to delete this project' });
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc      RSVP for a project
// @route     POST /api/v1/projects/:id/rsvp
// @access    Private
exports.rsvpProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ success: false, msg: 'Project not found' });
  }

  // Check if user has already RSVP'd
  if (project.attendees.includes(req.user.id)) {
    return res.status(400).json({ success: false, msg: 'You have already RSVPd for this project' });
  }

  project.attendees.push(req.user.id);

  await project.save();

  res.status(200).json({
    success: true,
    data: project
  });
});
