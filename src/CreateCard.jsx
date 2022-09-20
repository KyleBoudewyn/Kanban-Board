import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [value, onChange];
};

const CreateCard = (props) => {
  const [title, titleOnChange] = useInput('');
  const [description, descriptionOnChange] = useInput('');
  const [assignee, assigneeOnChange] = useInput('');
  const [status, statusOnChange] = useInput('');
  const [priority, priorityOnChange] = useInput('');
  const [story_points, story_pointsOnChange] = useInput('');
  const [due_date, due_dateOnChange] = useInput('');
  const [titleError, setTitleError] = useState(null);

  const saveCard = () => {
    // check if name is empty
    console.log('trying to save card');
    if (title === '') {
      setTitleError('required');
    } else {
      const creation_date = new Date().toLocaleString();
      const body = {
        title,
        description,
        assignee,
        status,
        priority,
        story_points,
        due_date,
        creation_date,
      };
      console.log(body);
      fetch('/api/card', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          response.json();
        })
        .catch((err) =>
          console.log('CreateCard fetch /api/card: ERROR: ', err)
        );
    }
  };
  // useEffect to clear titleError when title is changed
  useEffect(() => {
    setTitleError(null);
  }, [title]);
  // I am using &nbsp; for spacing this is just to temprarily make it look good
  return (
    <section className="createCard">
      <article className="form">
        <h3>What needs to be done?</h3>
        <div className="createCardFields">
          <label htmlFor="title">
            Title:
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          <input
            name="title"
            placeholder="Text..."
            value={title}
            onChange={titleOnChange}
          />
          {titleError ? <span className="errorMsg">{titleError}</span> : null}
        </div>
        <div className="createCardFields">
          <label htmlFor="description">Description: &nbsp;</label>
          <input
            name="description"
            placeholder="Text..."
            value={description}
            onChange={descriptionOnChange}
          />
        </div>
        <div className="createCardFields">
          <label htmlFor="assignee">Assignee: &nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            name="assignee"
            placeholder="Name..."
            value={assignee}
            onChange={assigneeOnChange}
          />
        </div>
        <div className="createCardFields">
          <label htmlFor="status">
            Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          <select
            name="status"
            id="status"
            value={status}
            onChange={statusOnChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="createCardFields">
          <label htmlFor="priority">
            Priority: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          <select
            name="priority"
            id="priority"
            value={priority}
            onChange={priorityOnChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <div className="createCardFields">
          <label htmlFor="story_points">Story Points: </label>
          <input
            type="number"
            min="0"
            max="100"
            name="story_points"
            placeholder="Number"
            value={story_points}
            onChange={story_pointsOnChange}
          />
        </div>
        <div className="createCardFields">
          <label htmlFor="due_date">Due Date: &nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            name="due_date"
            placeholder="Text..."
            value={due_date}
            onChange={due_dateOnChange}
          />
        </div>
        <div className="createCardButton">
          <Link to="/" className="backLink">
            <button type="button" className="btnSecondary">
              Cancel
            </button>
          </Link>
          <button type="button" className="btnMain" onClick={saveCard}>
            Save
          </button>
        </div>
      </article>
    </section>
  );
};

export default withRouter(CreateCard);
