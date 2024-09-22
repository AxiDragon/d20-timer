import Timer from './components/Timer';
import TaskList from './components/TaskList';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.top}>
        <div>
          info
        </div>
        <Timer />
        <div>
          task creator
        </div>
      </div>
      <div className={styles.bottom}>
        <TaskList />
      </div>
    </div>
  );
}

export default App;
