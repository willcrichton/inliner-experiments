import React from 'react';
import ReactMarkdown from 'react-markdown';
import raw from 'raw.macro';
import MonacoEditor from 'react-monaco-editor';

import './App.scss';

let Edit = ({
  src,
  ...props
}) => {
  let height = src.split('\n').length * 20;
  return <MonacoEditor
           value={src}
           height={src === '' ? 200 : height}
           language="python"
           options={{automaticLayout: true, minimap: {enabled: false},
                     ...props}} />;
}

let Md = (props) => <ReactMarkdown source={props.src} escapeHtml={false} />;

const test = raw('./test.md');

let Intro = () => {
  const text = `
In this experiment, you will be provided two snippets of code using the [Seaborn library](http://seaborn.pydata.org/) to visualize data. You will attempt several tasks involving understanding and modifying the code. **Your goal is to solve the tasks as quickly as possible, by any means necessary.** Your answers will not be judged for cleanliness, quality, etc., just correctness.

Open the [scratchpad notebook](http://localhost:8888/notebooks/scratchpad.ipynb). Follow the instructions the top of the notebook, then click **Next** once you have completed them.
  `;
  return <div>
    <Md src={text} />
    <p style={{fontSize: '24px', fontWeight: 'bold'}}>
      Do not close this webpage at any point before completing the experiment!
    </p>
  </div>
}

let ExampleSnippet = () => {
  return <div>
    <p>In this experiment, you will be provided with a series of reference snippets using Seaborn. You will be provided several tasks for how to tweak the output of the snippet. As a warm up, we will start with the snippet below.</p>
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
    <h2>Task: Swap the x and y axes of the plot</h2>
    <p>In the original plot, the x-axis is <code>total_bill</code> and the y-axis is <code>tip</code>. Produce a new scatter plot with the axes swapped, shown below.</p>
    <img src="/example-snippet.png" />
    <p>In each task, you will be provided a description and example output like above. You should solve the problem in the scratchpad notebook, then copy your solution into the code cell below. <b>Only click Next once you are confident you have solved the problem. You cannot go back.</b></p>
    <Edit src={''} />
  </div>;
};

let Conclusion = () => {
  return <div>
    You have completed the study. Thank you for participating!
  </div>;
};

class App extends React.Component {
  state = {
    page: 0
  }

  pages = [Intro, ExampleSnippet, ExampleTask, Conclusion]

  times = []

  constructor(props) {
    super(props);
    this.start = Date.now();
  }

  next() {
    const now = Date.now();
    this.times.push(now - this.start);
    this.start = now;
    this.setState({
      page: this.state.page + 1
    });
  }

  render() {
    return (
      <div className="app">
        <h1>Inliner user study</h1>
        <div className='page'>
          {this.pages[this.state.page]()}
        </div>
        {this.state.page < this.pages.length - 1
                         ? <button className='next' onClick={() => this.next()}>
                           Next
                         </button>
                         : null}
      </div>
    );
  }
}
/*
 * <MonacoEditor
 * width = "800"
 * height = "200"
 * language = "python"
 * options = {{
 *   minimap: {
 *     enabled: false
 *   }
 * }}
 * value = {
 *   "print('hello world')"
 * }
 * />
 *  */

export default App;