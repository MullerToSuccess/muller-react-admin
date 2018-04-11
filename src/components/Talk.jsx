/**
 * Created by Muller on 2018/3/30.
 */
import React, {Component} from 'react';
import {Row, Card,Input, Button} from 'antd';
import axios from 'axios';
// import db from '../db.js';

// import EchartsViews from '../dashboard/EchartsViews';

class Comment extends Component{
    render(){
        return (
            // <div></div>
            <li className = 'board-main-item'>
                <p ><span className = 'form-name'>{this.props.author} </span> 说：</p>
                <p>
                    {this.props.children}
                </p>
                <footer className='board-main-item-origin'>
                    <time>发表时间 <span className='form-time'>{this.props.dtime} </span></time>
                </footer>
            </li>
        );
    }
}

class CommentList extends Component{
    render(){
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment key={comment._id} author={comment.author} dtime={comment.dtime}>
                    {comment.msg}
                </Comment>
            );
        });
        return (
            <ul className='board-main-list'>
                    {commentNodes}
            </ul>
        );
    }
}

class CommentForm extends Component{
    constructor(){
        super();
        this.timetrans = this.timetrans.bind(this);
    }
    timetrans = (date) => {
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    }
    handleSubmit = () => {
        let author = this.refs.author.value.trim();
        let msg = this.refs.msg.value.trim();
        let dtime = this.timetrans(new Date());
        if ( !author || !msg ) {
            return ;
        }

        // localStorage.setItem('author', author);
        this.props.onCommentSubmit({author: author, msg: msg,dtime:dtime});
    };
    
    render() {
        return (
            <div >
                <form >
                    <fieldset>
                        <legend>可以在这里说您想说的话</legend>
                        <div>
                            <label>姓名</label>
                            <input ref='author' defaultValue='muller' />
                            <span>正确格式为：1~18个字符，可使用汉字、字母(已输入字符数:)</span>
                        </div>
                        <div>
                            <label>留言</label>
                            <textarea  ref='msg' defaultValue='this is a message' />
                            <span >正确格式为：1~240个字符(已输入字符数: )</span>
                        </div>
                        <div>
                        <Button onClick={this.handleSubmit}>submit</Button>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}


class CommentBox extends Component{
    
    constructor(){
        super();
        this.state={
            data:[]
        }
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
    componentWillMount(){
        const t = this;
        axios.get('http://39.108.165.204:3000/getMsg')
          .then(function (response) {
            console.log(response);
            t.setState({data: response.data});
          })
          .catch(function (error) {
            console.log(error);
          });

          
    }
    handleCommentSubmit = (msg)=>{ //comment 就是表名
        // alert(12);
        const data = {
            author:'muller3',
            msg:'message3',
            dtime:'123'
        }
        //获取提交form的数据：
        let query = {
            author: msg.author,
            msg:msg.msg,
            dtime:msg.dtime
        }
        const t = this;
        axios.get('http://39.108.165.204:3000/saveMsg'+
        '?author='+query.author
        +'&msg='+query.msg+'&dtime='+query.dtime)
          .then(function (response) {
            console.log(response);
            axios.get('http://39.108.165.204:3000/getMsg')
            .then(function (response) {
              console.log(response);
              t.setState({data: response.data});
            })
            .catch(function (error) {
              console.log(error);
            });
          })
          .catch(function (error) {
            console.log(error);
          });     
    };
    render(){
        return (
            <div >
                <CommentList  data={this.state.data} />
                <CommentForm onCommentSubmit = {this.handleCommentSubmit} />
            </div>
        );
    }
};
class Talk extends React.Component {
    
    render() {
        return ( 
      <CommentBox />
        )
    }
}

export default Talk;