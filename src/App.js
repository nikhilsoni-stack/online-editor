import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import './App.css';
import  Sidebar  from './Sidebar';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '# Hello World program in Python',
      input:'',
      result:'',
      languages:["c++11","Python"],
      selectedLanguage:"Python", 
      selectedLanguageId:"1",
      languagesCode:['// hello world program in c++','# Hello World program in Python'],
      disableAll:false,
    }
    this.code="";
    this.input="";
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange=(newValue, e)=> {
    this.code=newValue;
   
  }
  onChangInput=(newValue,e)=>
  {
    this.input=newValue
  }
  selectLanguage=(index)=>
  {
    
   this.setState({
      selectedLanguage:this.state.languages[index],
      selectedLanguageId:index,
      code:this.state.languagesCode[index],
      result:"",
      input:""
    });
    
  }
  runCode=()=>
  {
    var arr=this.state.languagesCode;
    arr[this.state.selectedLanguageId]=this.code;

    this.setState({
      code:this.code,
      input:this.input,
      disableAll:true,
      languagesCode:arr,
      
    });

     const data={
      code:this.code,
      input:this.input,
      lagnguage:this.state.selectedLanguage,
    }
    
    axios.post("https://dudley-lumberjack-92939.herokuapp.com/compile",data).then(response=>{
    console.log(response);  
    var output;
    if(response.data.status.id==3)output=response.data.stdout;
    else if(response.data.compile_output)output=response.data.compile_output;
    else output=response.data.stderr;
    this.setState({
        result:output,
        disableAll:false
      })
    }).catch(re=>{
      alert("Something went wrong!!!");
      this.setState({
        disableAll:false
      })
    });


  }
  saveCode=()=>
  {
    var arr=this.state.languagesCode;
    arr[this.state.selectedLanguageId]=this.code;

    this.setState({
      code:this.code,
      languagesCode:arr,
      
    });


  }
  render() {
    const code = this.state.code;
    const input=this.state.input;
    const result=this.state.result;
    const lang=this.state.selectedLanguage;
    const options = {
      selectOnLineNumbers: true
    };

    return (
      <div style={{background:"#9e9a90",}}>
      <button type="button" className="btn btn-outline-primary btn-sm mr-1" onClick={this.runCode} disabled={this.state.disableAll} >Run</button>
      <button type="button" className="btn btn-outline-success btn-sm mr-1" onClick={this.saveCode} disabled={this.state.disableAll}>Save</button>
      <div className="btn-group">
  <button type="button" class="btn btn-danger dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={this.state.disableAll}> 
    {lang}
  </button>
  <div className="dropdown-menu">
    {/* <a className="dropdown-item" onClick={this.selectLanguage.bind(this,0)} href="#">c++11</a> */}
    <a className="dropdown-item" onClick={this.selectLanguage.bind(this,1)} href="#">Python</a>
    
    
  </div>
</div>
      <div className="rowC">
        
      <MonacoEditor
      
        width="600"
        height="670"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
      <div style={{float:'left'}}>
      <Sidebar input={input} result={result} onChange={this.onChangInput}></Sidebar>
      </div>
      </div>
      
      </div>
    );
  }
}
export default App;
