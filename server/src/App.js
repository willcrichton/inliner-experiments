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
  return <MonacoEditor value={src} language="python" height={height}
                options={{automaticLayout: true, minimap: {enabled: false},
                          ...props}} />;
}

let Md = (props) => <ReactMarkdown source={props.src} escapeHtml={false} />;

const test = raw('./test.md');

let Intro = () => {
  const text = `
In this experiment, you will be provided two snippets of code using the [Seaborn library](http://seaborn.pydata.org/) to visualize data. You will attempt several tasks involving understanding and modifying the code. **Your goal is to solve the tasks as quickly as possible, by any means necessary.** Your answers will not be judged for cleanliness, quality, etc., just correctness.

Open the [scratchpad notebook](http://localhost:8888/notebooks/scratchpad.ipynb). Follow the instructions the top of the notebook, then click **Next** once you have completed them.`;
  return <Md src={text} />;
}

let Example = () => {
  const text = `
In this experiment, you will be provided with a series of reference snippets using Seaborn.
`;

  return <div>
    <Md src={text} />
    <Edit src={"sns.scatterplot(x=tips.tip, y=tips.total_bill)"}
          editable={false} />
  </div>;
}



class App extends React.Component {
  state = {
    page: 1
  }

  pages = [Intro, Example]

  render() {
    return (
      <div className="app">
        <h1>Inliner user study</h1>
        <div className='page'>
          {this.pages[this.state.page]()}
        </div>
        <button onClick={() => {this.setState({page: this.state.page + 1});}}>
          Next
        </button>
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