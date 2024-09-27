import Timer from './components/Timer';
import TaskList from './components/TaskList';
import styles from './App.module.css';
import TaskCreator from './components/TaskCreator';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.top}>
        <TaskCreator />
        <Timer />
        <div>
          <h1>D20 Timer</h1>
          <p>
            D20 Timer is a simple task manager that uses a random 1-20 minute timer to help you stay focused!
            <br />
            You can also create tasks to complete within the time limit.
            <br />
            The little writing space is there for a reason - make your tasks small and bite-sized!
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <TaskList />
      </div>
    </div>
  );
}

export default App;
