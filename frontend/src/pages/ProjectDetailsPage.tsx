import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProject, reset } from '../store/projectSlice';
import { RootState, AppDispatch } from '../store/store';
import { useParams } from 'react-router-dom';

function ProjectDetails() {
  const { project, isLoading, isError, message } = useSelector(
    (state: RootState) => state.projects
  );

  const dispatch = useDispatch<AppDispatch>();
  const { projectId } = useParams();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (projectId) {
      dispatch(getProject(projectId));
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, projectId]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const { user } = useSelector((state: RootState) => state.auth);

  const onRsvp = () => {
    if (projectId) {
      dispatch(rsvpProject(projectId));
    }
  };

  return (
    <div className='project-page'>
      <section className='heading'>
        <h1>{project.title}</h1>
        <h2>
          Status: <span className={`status status-${project.status}`}>{project.status}</span>
        </h2>
        <h3>Date: {new Date(project.date).toLocaleString('en-US')}</h3>
      </section>
      <section className='content'>
        <div className='project-desc'>
          <h3>Description</h3>
          <p>{project.description}</p>
        </div>
        {user && (
          <button className='btn' onClick={onRsvp}>
            RSVP
          </button>
        )}
        {project.images && project.images.length > 0 && (
          <div className='project-gallery'>
            <h3>Media Gallery</h3>
            <div className='gallery-images'>
              {project.images.map((image, index) => (
                <img key={index} src={image} alt={`Project Image ${index + 1}`} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProjectDetails;
