import { Tabs, Button, Card, Icon } from 'antd';
import React, {Component} from 'react'
import Search from './searchpage'
import AnswerList from './answerlist.js'
import "./styles/index.sass"
import Highlighter from "react-highlight-words";
const { TabPane, TabBar } = Tabs;
import Content from "./newtab_content"
import { Document, Page} from 'react-pdf/dist/entry.webpack';

import { APP_CONSTANTS } from './../../constants';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});


const data0 = [
  {
    document_id: "012-18113056",
    bg_title: "Nurse practitioners and midwives \u2013 provider eligibility and registration",
    process_des: "",
    likes: 22,
    dislikes: 4,
  },
  {
    document_id: "012-42040000",
    bg_title: "Other Medical Practitioners programs for Medicare",
    process_des: "",
    likes: 11,
    dislikes: 3,
  },
  {
    document_id: "012-42020090",
    bg_title: "Recognition or removal of General Practitioners (GP) \u2013 RACGP, ACRRM or Vocational Register",
    process_des: "",
    likes: 3,
    dislikes: 0,
  },
  {
    document_id: "012-42010020",
    bg_title: "Provider location details for health professionals in Medicare",
    process_des: "",
    likes: 2,
    dislikes: 0,
  },
  {
    document_id: "012-18061955",
    bg_title: "Occupational therapists and additional qualifications (Focussed Psychological Strategies)",
    process_des: "",
    likes: 1,
    dislikes: 0,
  },
]



const data1 = [
  {
    document_id: "012-18062131",
    bg_title: "Mental health nurses and additional qualifications (Pregnancy Support Counselling)",
    process_des: "",
    likes: 22,
    dislikes: 4,
  },
  {
    document_id: "012-42060000",
    bg_title: "Section 19AB and health professionals in Medicare",
    process_des: "",
    likes: 11,
    dislikes: 3,
  },
  {
    document_id: "012-18060401",
    bg_title: "Australian College of Rural & Remote Medicine (ACRRM) - 3GA Independent Pathway Placement",
    process_des: "",
    likes: 3,
    dislikes: 0,
  },
  {
    document_id: "012-40030000",
    bg_title: "Perform telephone security check for Medicare health professionals",
    process_des: "",
    likes: 2,
    dislikes: 0,
  },
  {
    document_id: "012-18063033",
    bg_title: "Aboriginal and Torres Strait Islander health practitioner - recognition and removal",
    process_des: "",
    likes: 1,
    dislikes: 0,
  },
]

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 1;
    const panes = [
      { title: <span>
        <Icon type="heart" theme="filled" style={{color:"pink"}}/>
        Top Policies
      </span>, content: <AnswerList data={data0} clickDocuments={this.add}/>, key: '2' , closable: false},
      { title: <span>
        <Icon type="fire" theme="filled" style={{color:"red"}}/>
        Personal Favourite
      </span>, content: <AnswerList data={data1} clickDocuments={this.add}/>, key: '3' , closable: false},
      { title: <span>
      <Icon type="bar-chart"/>
        Analytics
      </span>,
      content: <div style={{backgroundColor:"white", width:"100%", height:"77vh"}}>
      <Document
          file={APP_CONSTANTS.BACKEND_ENTRY+"/pdf"}
          loading="Loading"
      >
        <Page pageNumber={1}/>
      </Document>
       </div>, key: '4' , closable: false},
      ];
    this.state = {
      activeKey: "1",
      panes,
      welcometext: true,
    };
    this.child = React.createRef();
  }
  elastic_search (data) {
    console.log(data)
    this.child.current.elastic_search(data)
  }
  //
  welcome = () => {
    this.setState({
      welcometext : !this.state.welcometext
    })
  }

  componentDidMount()
  {
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = (data) => {
    console.log(data)
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: data.title, content:
        <Content data={data}/>
      , key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };


  render() {
    // return (
    //   <Card className="ela-container1" bordered={true} style={{margin: "10px", borderRadius: "20px"}}>
    //     <Tabs
    //       hideAdd
    //       onChange={this.onChange}
    //       activeKey={this.state.activeKey}
    //       type="editable-card"
    //       onEdit={this.onEdit}
    //       animated>
    //       {this.state.panes.map(pane => (
    //         <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
    //           {pane.content}
    //         </TabPane>
    //       ))
    //       }
    //     </Tabs>
    //   </Card>
    // );
    return (
      <div className="ela-container1">

         {this.props.isUserLogged ?
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
          animated>{

          [<TabPane tab={<span><Icon type="robot"/>Result</span>} key={"1"} closable={false}>
            <Search clickDocuments={this.add} search_input={this.props.search_input} ref={this.child}/>
          </TabPane>,
        ].concat(
                this.state.panes.map(pane => (
                  <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                  {pane.key==4 ? <div>{pane.content}</div>
                    :
                    <div className='PaneContent'>
                      {pane.content}
                    </div>
                  }
                  </TabPane>
                )))
          }
        </Tabs>
        :
       <div className="WelcomePane">
          {
            this.state.welcometext ?

            <span className="WelcomeText">
              Welcome
            </span>
            :
            <span className="WelcomeText">
              Please Login
            </span>
          }

       </div>
     }
      </div>
    );
  }
}
