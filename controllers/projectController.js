const Project = require('../models/Project');

exports.getAllProjects = async (req, res, next) => {
  try {
    // 分页参数
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 获取总数
    const total = await Project.countDocuments();
    
    // 获取分页数据
    const projects = await Project.find()
      .populate('user', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('user', 'username email');
    
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    
    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const { title, description, imageUrl, repoUrl, liveUrl } = req.body;
    
    if (!title || !description) {
      res.status(400);
      throw new Error('Title and description are required');
    }
    
    const project = await Project.create({
      title,
      description,
      imageUrl,
      repoUrl,
      liveUrl,
      user: req.user._id,
    });
    
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    
    // 权限检查：只有项目作者才能更新
    if (project.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this project');
    }
    
    const { title, description, imageUrl, repoUrl, liveUrl } = req.body;
    
    project.title = title || project.title;
    project.description = description || project.description;
    project.imageUrl = imageUrl !== undefined ? imageUrl : project.imageUrl;
    project.repoUrl = repoUrl !== undefined ? repoUrl : project.repoUrl;
    project.liveUrl = liveUrl !== undefined ? liveUrl : project.liveUrl;
    
    const updatedProject = await project.save();
    
    res.json(updatedProject);
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    
    // 权限检查：只有项目作者才能删除
    if (project.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this project');
    }
    
    await project.deleteOne();
    
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    next(err);
  }
};
