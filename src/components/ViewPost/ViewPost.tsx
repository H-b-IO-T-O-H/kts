import React, {Component} from "react";
import "Css/postView.scss"
import BlogTag from "@components/Blog/blogTag";
import {Link} from "react-router-dom";

let answersExample = [
    {text: "first answer text"},
    {text: "second answer text"},
    {text: "third answer text"},
    {text: "forth answer text"},
]


// class CommentAnswers extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             clicked: false,
//             answers: [],
//             answerCnt: this.props.answers ? this.props.answers.length : 0,
//             commentAuthor: ""
//         };
//         this.answerView = this.answerView.bind(this)
//         this.prepareAnswers(answersExample, this.props.commentAuthor);
//     }
//
//     answerView = (key, text, answerAuthor, commentAuthor) => {
//         return (
//             <div className="post-comment post-comment-answer w-50 ml-3" key={key}>
//                 <div className="ml-4">
//                     <div className="d-flex flex-row justify-content-between">
//                         <div className="d-flex flex-row ">
//                             <img className="post-comment-avatar" src="/public/img/hamster.webp"
//                                  alt="img not loaded"/>
//                             <div><Link className="ml-3" to="/profile">{answerAuthor}</Link> <small
//                                 className="grey-text">ответил {commentAuthor}</small></div>
//                         </div>
//                     </div>
//                     <div>{text ? <p>{text}</p> :
//                         <p>Some quick example text to build on the card title and make up the bulk of the card's
//                             content.</p>
//                     }</div>
//                     <div className="d-flex flex-row justify-content-between align-items-center">
//                         <small className="date-time grey-text"> 25 января 2021 г. в 12:58</small>
//
//                         <button className="btn-post-social btn-post-comment blue-color ml-2"
//                                 onClick={e => {
//                                     this.setState({clicked: !this.state.clicked, commentAuthor: answerAuthor});
//                                 }}><small>Ответить</small>
//                         </button>
//                     </div>
//                     <hr className="mt-0"/>
//
//                 </div>
//             </div>
//         )
//     }
//
//     answerPush = (text, commentAuthor) => {
//         this.setState({
//             clicked: false,
//             answerCnt: ++this.state.answerCnt,
//             answers: this.state.answers.concat(this.answerView(this.state.answerCnt - 1, text, "Vlad", commentAuthor))
//         });
//     }
//
//     prepareAnswers = (answers, commentAuthor) => {
//         for (let i = 0; i < this.state.answerCnt; ++i) {
//             this.state.answers.push(this.answerView(i, answers[i].text, `Author${i}`, commentAuthor))
//         }
//     }
//
//     render() {
//         return (
//             <div>
//                 <a id="go-down-answer" className="href-transparent" href="#comment-answer-new"/>
//                 {this.state.answers}
//                 {this.state.clicked ? <div className="post-comment-new">
//                     {$("#go-down-answer")[0].click()}
//                     <hr/>
//                     <h5 className="ml-3">Ваш комментарий</h5>
//                     <div className="d-flex flex-row justify-content-between align-items-center">
//                         <div className="d-flex flex-row post-comment-content">
//                             <img className="post-avatar-lg ml-3" src="/public/img/hamster.webp"
//                                  alt="img not loaded"/>
//                             <textarea id="comment-answer-new" className="form-control ml-3" rows="1"/>
//                         </div>
//                         <button className="btn-post-social"
//                                 onClick={e => (this.answerPush($("textarea#comment-answer-new").val(), this.state.commentAuthor))}>
//                             <i
//                                 className="fa fa-paper-plane fa-lg mr-3 post-icon-comment"/></button>
//                     </div>
//                     <hr/>
//                 </div> : null}
//             </div>
//         )
//     }
// }
//
// const commentView = (key, text, answers, commentAuthor) => (
//     <div className="post-comment" key={key}>
//         <div className="card-header d-flex flex-row justify-content-between">
//             <div>
//                 <img className="post-comment-avatar" src="/public/img/hamster.webp"
//                      alt="img not loaded"/>
//                 <Link className="ml-3" to="/profile">Вася Пупкин</Link>
//             </div>
//             <p className="date-time grey-text"> 25 января 2021 г. в 12:58</p>
//         </div>
//         <div className="card-body">
//             <div>{text ? <p>{text}</p> :
//                 <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//             }</div>
//         </div>
//         <CommentCreate isAnswer={true}/>
//         <CommentAnswers answers={answers} commentAuthor={commentAuthor}/>
//     </div>
// )
//
// class CommentCreate extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {clicked: false, isAnswer: this.props.isAnswer};
//     }
//
//     postAnswer = () => (
//         <blockquote className="blockquote mb-0">
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
//             <footer className="blockquote-footer">Someone famous in <cite>Sourc
//                 Title</cite></footer>
//         </blockquote>
//     )
//
//     render() {
//         return (
//             <div>
//                 <a id="go-down" className="href-transparent" href="#comment-new"/>
//                 {!this.state.isAnswer ?
//                     <div>
//                         <button className="btn-post-social btn-post-comment blue-color ml-2"
//                                 style={{color: this.state.clicked ? "red" : null}}
//                                 onClick={e => {
//                                     this.setState({clicked: !this.state.clicked});
//                                 }}>Оставить комментарий
//                         </button>
//                     </div> :
//                     <button className="btn-post-social btn-post-comment blue-color ml-2"
//                             style={{color: this.state.clicked ? "red" : null}}
//                             onClick={e => {
//                                 this.setState({clicked: !this.state.clicked});
//                             }}>Ответить
//                     </button>
//                 }
//                 {this.state.isAnswer ? <hr/> : null}
//
//                 {this.state.clicked ? <div className="post-comment-new"
//                                            style={this.state.isAnswer ? {
//                                                borderLeft: ".25rem solid #eceeef",
//                                                marginLeft: "1rem"
//                                            } : null}>
//                     {$("#go-down")[0].click()}
//                     <hr/>
//                     <h5 className="ml-3">Ваш комментарий</h5>
//                     <div className="d-flex flex-row justify-content-between align-items-center">
//                         <div className="d-flex flex-row post-comment-content">
//                             <img className="post-avatar-lg ml-3" src="/public/img/hamster.webp"
//                                  alt="img not loaded"/>
//                             <textarea id="comment-new" className="form-control ml-3" rows="1"/>
//                         </div>
//
//                         <button className="btn-post-social" onClick={e => {
//                             this.setState({clicked: false, isAnswer: false})
//                             this.props.commentsPush($("textarea#comment-new").val());
//                         }}><i
//                             className="fa fa-paper-plane fa-lg mr-3 post-icon-comment"/></button>
//                     </div>
//                     <hr/>
//                 </div> : null}
//
//             </div>
//         )
//     }
//
// }


type Props = {
    id: string|number;
}

export const PostView: React.FC<Props> = ({id}) => {

    const [isOutputFull, changeOutputFull] = React.useState(false);
    const [isLiked, changeLiked] = React.useState(false);
    const [likesCnt, changeLikesCnt] = React.useState(0);

    const declOfNum = (n: number, text_forms: Array<string>) => {
        n = Math.abs(n) % 100;
        let n1 = n % 10;
        if (n > 10 && n < 20) {
            return text_forms[2];
        }
        if (n1 > 1 && n1 < 5) {
            return text_forms[1];
        }
        if (n1 === 1) {
            return text_forms[0];
        }
        return text_forms[2];
    }


    return (
        <div
            className="container-fluid flex-column h-100 justify-content-center align-items-center col-md-10 col-xl-7">
            <div className="card">
                <div className="card-header d-flex flex-row justify-content-between">
                    {isOutputFull ?
                        <p className="post-title">Вручение сертификатов семестровых курсов 28 января</p>
                        :
                        <Link to={`/posts/${id}`}><p className="post-title">Вручение сертификатов семестровых
                            курсов 28 января</p></Link>
                    }

                    <p className="date-time grey-text"> 25 января 2021 г. в 12:58</p>
                </div>
                <div className="card-body">
                    <BlogTag/>
                    <p className="mt-3">
                        &nbsp;Поздравляю студентов&nbsp; с окончанием семестровых курсов в
                        Технопарке!<br/>Мы
                        знаем, что это было непросто, но все вы – молодцы!&nbsp;<br/>Каждого&nbsp; успешного
                        выпускника&nbsp; ждет сертификат, который в будущем можно использовать в резюме или
                        портфолио.<br/><br/>Даже в режиме удаленки&nbsp;мы не просто отправляем сертификаты,
                        а вручаем их. Поэтому приглашаем всех выпускников на онлайн вручение, которое
                        начнется в четверг, <strong>28 января, в 16:00.</strong><br/><br/><strong>Программа
                        мероприятия:</strong><br/>- приветственные слова руководителя департамента
                        образования Mail.ru Group Анны Степановой,&nbsp;<br/>- специальный гость и
                        интерактивная часть,&nbsp;<br/>- Андрей Викторович Пролетарский и
                        преподаватели&nbsp; Технопарка скажут пару напутственных слов,&nbsp;<br/>-&nbsp; я
                        расскажу вам о тех курсах, которые&nbsp; мы запланировали в семестре Весна -
                        2021&nbsp;<br/>- вручение сертификатов.<br/><br/>Важно! Бумажную версию сертификата
                        каждый из вас сможет получить в феврале. Вся информация о выдаче будет на
                        портале.<br/><br/><strong>Ссылка на подключение:</strong><br/>Мероприятие будет
                        закрытым и пройдет в любимом Зуме. Ссылка на комнату&nbsp;<a
                        href="https://mailru.zoom.us/j/92900161419?pwd=UFZzbnl3TkgzbXRiWVBaU2txMEtrdz09"
                        target="_blank"
                        rel="noopener">https://mailru.zoom.us/j/92900161419?pwd=UFZzbnl3TkgzbXRiWVBaU2txMEtrdz09</a><br/><br/>Мы
                        пришлем напоминание и ссылку еще раз в день вручения за пару часов до старта.&nbsp;
                        <br/>Увидимся!&nbsp;&nbsp;</p>
                    <footer className="grey-text">
                        <hr/>
                        <div className="d-flex flex-nowrap flex-row justify-content-between">
                            <div className="ml-0">
                                <img className="post-avatar-sm" src="/public/img/hamster.webp"
                                     alt="img not loaded"/>
                                <Link to="/profile">
                                    Сергей Козлачков
                                </Link>
                            </div>

                            <div className="mr-3">
                                <a id="go-to-comments" className="href-transparent" href="#comments"/>
                                <button className="btn-post-social" onClick={() => {
                                    alert(1)
                                }}><i
                                    className="fa fa-comments fa-lg post-icon-comment"/></button>
                                {'5 комментов'}
                                <button className="btn-post-social btn-post-like"
                                        onClick={() => {
                                            changeLiked(!isLiked);
                                            changeLikesCnt(isLiked ? likesCnt - 1 : likesCnt + 1);
                                        }}><i
                                    className="fa fa-heart fa-lg post-icon-like"
                                    style={isLiked ? {color: "#ff4a4a"} : undefined}/></button>
                                {likesCnt}
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

            {isOutputFull ? <div>
                <button className="btn btn-primary btn-sm" onClick={()=>{alert(1)}}>comments-
                </button>
                <button className="btn btn-success btn-sm" onClick={()=>{alert(1)}}>comments+
                </button>
                <h1 className="m-3">
                    <span>{0} </span>{'comments'}
                </h1>

                <div data-spy="scroll" data-offset="0">
                    <div id="comments">
                        {0}
                    </div>
                    {<div className="text-center">
                        <button className="btn-post-social btn-post-comment blue-color"
                                onClick={() => {
                                    alert(1)
                                }}>Показать следующие комментарии
                        </button>
                    </div>}
                </div>
            </div> : null}
        </div>
    )
}

export default PostView;