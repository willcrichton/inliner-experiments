import React from 'react';
import ReactMarkdown from 'react-markdown';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';

import './App.scss';

let Edit = ({
  src,
  height,
  ...props
}) => {
  let auto_height = src.split('\n').length * 23;
  return <MonacoEditor
           value={src}
           height={height || auto_height}
           language="python"
           options={{automaticLayout: true, minimap: {enabled: false},
                     fontSize: "14px",
                     ...props}} />;
}

let Md = (props) => <ReactMarkdown source={props.src} escapeHtml={false} />;

let Intro = () => {
  return <div>
    <p>In this experiment, you will be provided two snippets of code using the <a href="http://seaborn.pydata.org/" target="_blank">Seaborn library</a> to visualize data. You will attempt several tasks involving understanding and modifying the code.</p>
    <p>
      First, start a screen recording tool to record your screen for the duration of the experiment.
      <ul>
        <li>Mac: Press Command-Shift-5, then press the "Record Entire Screen" button, then press "Record".</li>
        <li>Windows: Press Windows-Alt-R.</li>
        <li>Ubuntu: Open SimpleScreenRecorder, select "Record the entire screen", then hit "Start recording"</li>
      </ul>
    </p>
    <p>
      Then open the scratchpad notebook. Follow the instructions the top of the notebook, then click <b>Next</b> once you have completed them.
      <ul>
        <li>If you are in the group that is not NOT using the inliner tool, <a href="http://localhost:8888/notebooks/scratchpad_control.ipynb" target="_blank">use this notebook.</a></li>
        <li>If you are in the group that IS using the inliner tool, <a href="http://localhost:8888/notebooks/scratchpad_inliner.ipynb" target="_blank">use this notebook.</a></li>
      </ul>
    </p>
    <p style={{fontSize: '24px', fontWeight: 'bold'}}>
      Do not close this webpage at any point before completing the experiment!
    </p>
  </div>
}

let ExampleSnippet = () => {
  return <div>
    <h2>Example Snippet: Scatterplot</h2>
    <p>In this experiment, you will be provided with a series of reference snippets using Seaborn. You will accomplish several tasks by changing the output of the reference snippet. As a warm up, we will start with the snippet below.</p>
    <Edit src={"sns.scatterplot(x=tips.tip, y=tips.total_bill)"}
          readOnly={true} />
    <p>This snippet generates the output below.</p>
    <img src="/example-snippet.png" />
    <p>See the first few cells of the scratchpad notebook for an explanation of which modules are imported, and what the <code>tips</code> dataset is.</p>
    <p>Once you understand how the snippet works, click <b>Next</b> to begin the example task. Note that once the task begins, we will start the timer tracking your completion time. <b>Be prepared to start on the task as soon as you click Next</b>.</p>
  </div>;
}

let ExampleTask = () => {
  return <div>
    <h2>Example Task: Swap the x and y axes of the plot</h2>
    <p>In the original plot, the x-axis is <code>total_bill</code> and the y-axis is <code>tip</code>. Produce a new scatter plot with the axes swapped, shown below.</p>
    <div className='outputs'>
      <div className='output'>
        <h3>Original output</h3>
        <img src="/example-snippet.png" />
      </div>
      <div className='output'>
        <h3>Desired output</h3>
        <img src="/example-solution.png" />
      </div>
    </div>
    <p>In each task, you will be provided a description and example output like above. You should solve the problem in the scratchpad notebook, then copy your solution into the code cell below. <b>Only click Next once you are confident you have solved the problem. You cannot go back.</b></p> A few additional notes:
    <ul>
      <li>Your goal is to solve the tasks as quickly as possible, by any means necessary. Your answers will not be judged for cleanliness, quality, etc., just correctness.</li>
      <li>You are free to use any resources to solve the problem, including Google and StackOverflow. You may also read and modify the Seaborn library itself -- a copy has been provided in <code>inliner-experiments/deps/seaborn</code>, and any edits will automatically propagate into the notebook. If you modify Seaborn, do not worry about copying those changes, they will be collected after teh experiment is over.</li>
      <li>The tasks have been specifically designed to not be solvable just through the normal documentation. Again, you may need to read or edit the library source code.</li>
    </ul>
    <Edit src={'# Put your answer to the example task here, then click Next'} height={200} />
  </div>;
};

const BOXPLOT_SNIPPET = 'sns.boxplot(x=tips.day, y=tips.tip)'

let BoxplotSnippet = () => {};

const SECTIONS = [{
  title: 'Boxplot',
  description: `This code snippet generates a boxplot of the <code>tip</code> column grouped by the <code>day</code> column using the <a href="https://seaborn.pydata.org/generated/seaborn.boxplot.html" target="_blank">seaborn.boxplot</a> function.<br /><br />Make sure you understand what the snippet is doing. Execute the corresponding cell in the scratchpad notebook. Then click <b>Next</b> to proceed to the first task.`,
  snippet: 'sns.boxplot(x=tips.day, y=tips.tip)',
  tasks: [{
    title: 'Change the y-axis label to "Tip amount ($)"',
    description: 'Put your answer in the code cell below. It should generate a Matplotlib graph identical to the one below.'
  }, {
    title: 'Set width of box lines to half of default thickness',
    description: 'Do not try to eyeball the line thickness--it must be precisely half of the default value used by Seaborn.'
  }, {
    title: 'Draw outliers as points, not diamonds',
    description: 'Outliers are the marks drawn outside the boxplot range. By default, they are diamonds. They should instead be drawn as points.'
  }]
}, {
  title: 'FacetGrid',
  description: `The second code snippet is below. It uses Seaborn's <a href="https://seaborn.pydata.org/generated/seaborn.FacetGrid.html" target="_blank">FacetGrid API</a> to create a histogram of tip for each pair of <code>sex</code> and <code>day</code>. It works by first creating a facet grid object each row as <code>sex</code> and each column as <code>day</code>. Then the <code>g.map(plt.hist, 'tip')</code> runs the Matplotlib histogram function over the tip values of each sex and day pair.`,
  snippet: `g = sns.FacetGrid(data=tips, row='sex', col='day')
g.map(plt.hist, 'tip')`,
  fullwidth: true,
  tasks: [{
    title: 'Change title to look like sex: "Male", day: "Thur"',
    description: 'The default formatting is <code>sex = Male | day = Fri</code>. Change it to the template above.'
  }, {
    title: 'Draw a red vertical line at the median value in each histogram',
    description: `You may want to use <a href="https://matplotlib.org/3.1.1/api/_as_gen/matplotlib.axes.Axes.axvline.html" target="_blank"><code>matplotlib.Axes.axvline</code></a> and <a href="https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.median.html" target="_blank"><code>pandas.Series.median</code></a>.`
  }, {
    title: 'Change colors to match boxplot',
    description: `By default, the FacetGrid plots each histogram the same shade of blue. You need to make each histogram have the same color of the corresponding boxplot in the previous code snippet.<br /><br /><b>Be careful that the colors are the exact same!</b> Check that the boxplot is not darker than the FacetGrid.`
  }]
}];

let make_task_page = (section, task, i, j) => () => {
  const src_comment = section.snippet.split('\n').map((s) => `# ${s}`).join('\n');
  return <div>
    <h2>Task {i}.{j}: {task.title}</h2>
    <p dangerouslySetInnerHTML={{__html: task.description}} />
    <div className={'outputs ' + (section.fullwidth ? 'fullwidth' : '')}>
      <div className='output'>
        <h3>Original output</h3>
        <img src={`/output${i}.png`} />
      </div>
      <div className='output'>
        <h3>Desired output</h3>
        <img src={`/output${i}${j}.png`} />
      </div>
    </div>
    <Edit src={'# Put your answer here.\n\n# Reference snippet:\n' + src_comment}
          height={200} />
  </div>;
};

let make_section_page = (section, i) => () => {
  return <div>
    <h2>Snippet {i}: {section.title}</h2>
    <p dangerouslySetInnerHTML={{__html: section.description}} />
    <Edit src={section.snippet} readOnly={true} />
    <img src={`/output${i}.png`} />
  </div>
};

let task_pages = SECTIONS.map((section, i) => {
  let pages = [make_section_page(section, i + 1)];
  pages = pages.concat(section.tasks.map((task, j) =>
    make_task_page(section, task, i + 1, j + 1)));
  return pages;
}).flat();

let Conclusion = () => {
  return <div>
    <p>You have completed the main part of the experiment. Thank you for participating! 🎉</p>
    <p>To wrap up, please do a few things before you leave.</p>
    <ol>
      <li>Stop your screen recording, then move the generated video into the <code>inliner-experiments/</code>. Rename it to <code>screen.*</code> (don't change the file extension).</li>
      <li>From the <code>inliner-experiments/</code> directory, run <code>./finished.sh</code> then upload <code>experiment.zip</code> to this <a href="https://www.dropbox.com/request/mpi0uuqQRbHQzvklt4SZ" target="_blank">Dropbox link.</a></li>
      <li>Please fill out this short post-experiment survey.<br /><br />
        <ul>
          <li>If you were in the group that did NOT use the inliner tool, <a href="https://docs.google.com/forms/d/112iWLu3jdsSREuYFXH4iuezHwVvAws4YEm_H5oIIiBo/edit">click here</a>. </li>
          <li>If you were in the group that DID use the inliner tool, <a href="https://docs.google.com/forms/d/13zKObXiBk1GmgRCkLHiitw96vnK1Q4Ir-kkdg4M8zQg/edit">click here</a>.</li>
        </ul>
      </li>
    </ol>
  </div>;
};

class App extends React.Component {
  state = {
    page: 0,
    name: null
  }

  times = []

  constructor(props) {
    super(props);
    this.start = Date.now();
    this.pages = [Intro, ExampleSnippet, ExampleTask];
    this.pages = this.pages.concat(task_pages);
    this.pages.push(Conclusion);
    this.name_ref = React.createRef();
  }

  next() {
    const now = Date.now();
    this.times.push(now - this.start);
    this.start = now;
    this.setState({
      page: this.state.page + 1
    });
  }

  set_name() {
    this.setState({
      name: this.name_ref.current.value
    });
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
    axios.post('http://35.247.79.150:8888/', {times: this.times, name: this.state.name});
  }

  render() {
    return (
      <div className="app container">
        <h1>Inliner user study</h1>
        {this.state.name
        ? <div>
          <div className='page'>
            {this.pages[this.state.page]()}
          </div>
          {this.state.page < this.pages.length - 1
          ? <button className='next' onClick={() => this.next()}>
            Next
          </button>
          : null}
        </div>
      : <p>
        Enter your name: &nbsp;
        <input type="text" ref={this.name_ref} /> &nbsp;
        <button onClick={() => this.set_name()}>Submit</button>
      </p>}
      </div>
    );
  }
}

export default App;
