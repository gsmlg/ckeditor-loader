import $ from 'jquery';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Editor from './ckeditor.conf';

window.$ = $;
window.editor = Editor;

class App extends Component {

  componentDidMount() {
    var context = this.refs.editorContext;
    this.editor = Editor.replace(context, {
      width: '640px',
      height: '480px'
    });
  }

  render() {
    return (
      <div className="wrapper">
        <header>
          <h1>CKEditor</h1>
        </header>
        <section>
          <div id="context" ref="editorContext" />
        </section>
      </div>
    );
  }
}


$(function() {
  ReactDOM.render(
    <App />,
    document.getElementById('app'),
    () => {
      console.log('App mounted!');
    }
  );
});

