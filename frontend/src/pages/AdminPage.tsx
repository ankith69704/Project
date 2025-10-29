import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProject, getProjects, deleteProject, reset } from '../store/projectSlice';
import { RootState, AppDispatch } from '../store/store';
import { toast } from 'react-toastify';

function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    status: 'Upcoming',
  });

  const { title, description, date, status } = formData;

  const { projects, isLoading, isError, message } = useSelector(
    (state: RootState) => state.projects
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getProjects());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const projectData = {
      title,
      description,
      date,
      status,
    };
    dispatch(createProject(projectData));
  };

  const onDelete = (projectId: string) => {
    dispatch(deleteProject(projectId));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section className='heading'>
        <h1>Admin Dashboard</h1>
        <p>Manage Projects</p>
      </section>

      <section className='form'>
        <h2>Create Project</h2>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={onChange}
            ></textarea>
          </div>
          <div className='form-group'>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={date}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <select name='status' id='status' value={status} onChange={onChange}>
              <option value='Upcoming'>Upcoming</option>
              <option value='Ongoing'>Ongoing</option>
              <option value='Completed'>Completed</option>
            </select>
          </div>
          <div className='form-group'>
            <button className='btn btn-block' type='submit'>
              Add Project
            </button>
          </div>
        </form>
      </section>

      <section className='content'>
        <h2>Existing Projects</h2>
        <div className='projects'>
          {projects.map((project) => (
            <div key={project._id} className='project'>
              <div>{project.title}</div>
              <div>
                <button onClick={() => {}} className='btn btn-sm'>
                  Edit
                </button>
                <button onClick={() => onDelete(project._id)} className='btn btn-danger btn-sm'>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default AdminPage;
