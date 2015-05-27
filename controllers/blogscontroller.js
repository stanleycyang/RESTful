var Blog = require('../models/blog');

exports.index = function(request, response){
  Blog.find(function(error, blogs){
    if(error){
      response.json({message: 'Blog not found'});
    }
    response.json(blogs);
  });
};

exports.show = function(request, response) {
  Blog.findById(request.params.blog_id, function(error, blog){
    if(error){
      response.send(error);
    }
    response.status(200).json(blog);
  });
};

exports.create = function(request, response){
  var blog = new Blog({
    title: request.body.title,
    content: request.body.content
  });

  blog.save(function(error){
    if(error){
      return response.status(400).json({
        success: false,
        message: 'Blog was not created'
      });
    }
    response.status(201).json({message: 'Blog created'});
  });
};

exports.update = function(request, response){
  Blog.findById(request.params.blog_id, function(error, blog){
    if(error){response.json({message: 'Failed to update the blog'});}

    if(request.body.title) blog.title = request.body.title;
    if(request.body.content) blog.content = request.body.content;

    blog.save(function(error){
      if(error){
        response.json({message: 'Failed to update the user'});
      }
      response.json({message: 'Blog updated'});
    });
  });
};

exports.destroy = function(request, response){
  Blog.remove({
    _id: request.params.blog_id
  }, function(error, user){
    if(error){
      response.json({message: error});
    }

    response.json({message: 'Successfully deleted'});
  });
};
