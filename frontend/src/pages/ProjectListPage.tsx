import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, reset } from '../store/projectSlice';
import { RootState, AppDispatch } from '../store/store';
import ProjectItem from '../components/ProjectItem';

function ProjectList() {
  const { projects, isLoading, isError, message } = useSelector(
    (state: RootState) => state.projects
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getProjects());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section className='heading'>
        <h1>Projects</h1>
      </section>
      <section className='content'>
        {projects.length > 0 ? (
          <div className='projects'>
            {projects.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <h3>No projects to display</h3>
        )}
      </section>
    </>
  );
}

export default ProjectList;
