import React, { Component } from 'react';
import QuestionTable from './QuestionTable';

class QuestionPage extends Component { // Main question page
  render() {
      const { data } = this.props;
    const { sectionNumber, titleText, categories } = data;
      return (
      <div className={`Section ${sectionNumber}`}>
        <h1>{`Section ${sectionNumber}`}</h1>
        <QuestionTable
          className = {`Section${sectionNumber} Table`}
          titleText = {titleText}
          categories = {categories}
          sectionNumber = {sectionNumber}
          onChange = {this.props.onChange}
          answers = {this.props.answers}
        />
      </div>
    );
  }
}

export default QuestionPage;
