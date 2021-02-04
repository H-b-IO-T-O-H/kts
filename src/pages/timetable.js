import React, {Component} from "react";

const Table = () => (
    <table className="table  table-bordered table-hover">
        <thead>
        <tr>
            <th scope="col">Дисциплины / Недели</th>
            <th scope="col">1</th>
            <th scope="col">2</th>
            <th scope="col">3</th>
            <th scope="col">4</th>
            <th scope="col">5</th>
            <th scope="col">6</th>
            <th scope="col">7</th>
            <th scope="col">8</th>
            <th scope="col">9</th>
            <th scope="col">10</th>
            <th scope="col">11</th>
            <th scope="col">12</th>
            <th scope="col">13</th>
            <th scope="col">14</th>
            <th scope="col">15</th>
            <th scope="col">16</th>
            <th scope="col">17</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">Защита информации от утечки по техническим каналам</th>
            <td className="table-elem">
            </td>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
        </tr>
        <tr>
            <th scope="row">Основы криптографических методов защиты информации</th>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
        </tr>
        <tr>
            <th scope="row">Системы передачи и обработки информации</th>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
        </tr>
        <tr>
            <th scope="row">Спецдисциплина 11</th>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
        </tr>
        <tr>
            <th scope="row">Устройства радиоэлектронных систем</th>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
        </tr>
        <tr>
            <th scope="row">Цифровая обработка сигналов</th>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
            <td/>
        </tr>
        </tbody>
    </table>
)


export class Timetable extends Component {

    state = {
        btnList: [{id: "btn-0", disable: false}, {id: "btn-1", disable: false},
            {id: "btn-2", disable: false}, {id: "btn-3", disable: false},
            {id: "btn-4", disable: false}, {id: "btn-5", disable: false}, {id: "btn-6", disable: false}]
    };

    changeBtnStyle = (e, id) => {
        this.state.btnList.forEach(function (item, i, temp) {
            if (id !== item.id) {
                item.disable = !item.disable;
            }
        });
        this.setState(this.state.btnList)
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-row">
                    <div className="col-8">
                        <Table/>
                    </div>
                    <div className="d-flex flex-column col-4">
                        <div className="btn-group-vertical col-3">
                            <button id={this.state.btnList[0].id} className="btn btn-sm btn-Sem " type="button"
                                    data-toggle="collapse"
                                    data-target="#collapseExample"
                                    disabled={this.state.btnList[0].disable}
                                    onClick={(e) => {
                                        this.changeBtnStyle(e, this.state.btnList[0].id)
                                    }}>
                                <span className="btn-title">СЕМ</span>
                            </button>
                            <button className="btn btn-sm btn-Lek " type="button" data-toggle="collapse"
                                    data-target="#collapseExample"
                                    disabled={this.state.btnList[1].disable}
                                    onClick={(e) => {
                                        this.changeBtnStyle(e, this.state.btnList[1].id)
                                    }}>
                                <span className="btn-title">ЛЕК</span>
                            </button>
                            <button className="btn btn-sm btn-Lr " type="button" data-toggle="collapse"
                                    data-target="#collapseExample"
                                    disabled={this.state.btnList[2].disable}
                                    onClick={(e) => {
                                        this.changeBtnStyle(e, this.state.btnList[2].id)
                                    }}>
                                <span className="btn-title">ЛР</span>
                            </button>
                            <button className="btn btn-sm btn-Dz " type="button" data-toggle="collapse"
                                    data-target="#collapseExample"
                                    disabled={this.state.btnList[3].disable}
                                    onClick={(e) => {
                                        this.changeBtnStyle(e, this.state.btnList[3].id)
                                    }}>
                                <span className="btn-title">ДЗ</span>
                            </button>
                            <button className="btn btn-sm btn-Rk " type="button" data-toggle="collapse"
                                    data-target="#collapseExample"
                                    disabled={this.state.btnList[4].disable}
                                    onClick={(e) => {
                                        this.changeBtnStyle(e, this.state.btnList[4].id)
                                    }}>
                                <span className="btn-title">РК</span>
                            </button>
                            <button className="btn btn-sm btn-Con " type="button" data-toggle="collapse"
                                    data-target="#collapseExample"
                                    disabled={this.state.btnList[5].disable}
                                    onClick={(e) => {
                                        this.changeBtnStyle(e, this.state.btnList[5].id)
                                    }}>
                                <span className="btn-title">КОНС</span>
                            </button>
                            <button className="btn btn-sm btn-Exam " type="button" data-toggle="collapse"
                                    data-target="#collapseExample"
                                    disabled={this.state.btnList[6].disable}
                                    onClick={(e) => {
                                        this.changeBtnStyle(e, this.state.btnList[6].id)
                                    }}>
                                <span className="btn-title">ЭКЗ</span>
                            </button>
                        </div>
                        <div className="collapse" id="collapseExample">
                            <small className="text-black-50">Добавление описания события: </small>
                            <input/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
