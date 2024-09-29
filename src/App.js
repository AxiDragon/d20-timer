import Timer from './components/Timer';
import TaskList from './components/TaskList';
import styles from './App.module.css';
import TaskCreator from './components/TaskCreator';
import StickyButton from './components/StickyButton';
import OverlayMenu from './components/OverlayMenu';
import Settings from './components/Settings';

function App() {
  const settings = (
    <Settings />
  );

  return (
    <div className={styles.App}>
      <div className={styles.top}>
        <TaskCreator />
        <Timer />
        <div className='topElement'>
          <h1>D20 Timer.</h1>
          <p>
            D20 Timer is a simple task manager that uses a random 1-20 minute timer to help you stay focused!
            <br />
            You can also create small tasks to complete within the time limit.
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <TaskList />
      </div>
      <div className={styles.stickyButtons}>
        <StickyButton iconName='menu' side='right' />
        <StickyButton iconName='settings' side='left' />
      </div>
      <OverlayMenu openEventName={'menuButtonPressed'} content={settings} />
      <OverlayMenu openEventName={'settingsButtonPressed'} content={settings} />
    </div>
  );
}

export default App;
