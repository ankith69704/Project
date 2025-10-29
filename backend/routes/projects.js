const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  rsvpProject,
  projectPhotoUpload
} = require('../controllers/projects');

const Project = require('../models/Project');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Project, {
      path: 'user',
      select: 'name'
    }),
    getProjects
  )
  .post(protect, authorize('Admin'), createProject);

router
  .route('/:id')
  .get(getProject)
  .put(protect, authorize('Admin'), updateProject)
  .delete(protect, authorize('Admin'), deleteProject);

router.route('/:id/rsvp').post(protect, rsvpProject);

const upload = require('../middleware/upload');

router
  .route('/:id/photo')
  .put(protect, authorize('Admin'), upload.array('images', 10), projectPhotoUpload);

module.exports = router;
