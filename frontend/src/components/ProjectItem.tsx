import { Link } from 'react-router-dom';

function ProjectItem({ project }: { project: any }) {
  return (
    <div className='project'>
      <div>{new Date(project.date).toLocaleString('en-US')}</div>
      <div>{project.title}</div>
      <div>{project.status}</div>
      <Link to={`/project/${project._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  );
}

export default ProjectItem;
