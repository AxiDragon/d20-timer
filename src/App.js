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
          info
        </div>
      </div>
      <div className={styles.bottom}>
        <TaskList />
      </div>
    </div>
  );
}

export default App;
