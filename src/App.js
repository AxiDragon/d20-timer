import Timer from './components/Timer';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <Timer initialTime={5} />
      <TaskList initialTasks={['Task 1', 'Task 2']} />
    </div>
  );
}

export default App;
