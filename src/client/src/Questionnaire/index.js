import React, { Component } from 'react';

import QuestionData from './QuestionData';
import LandingPage from './LandingPage';
import QuestionPage from './QuestionPage';
import ResultsPage from './ResultsPage';

class Questionnaire extends Component {
  componentWillMount = () => {
    this.setState({
      currentSectionNumber: 0,
      section0: { a : 0, b : 3, c : 4, d : 0, e : 2, f : 1, g : 0, h : 0 }, // For example page
      section1: { a : 0, b : 0, c : 0, d : 0, e : 0, f : 0, g : 0, h : 0 },
      section2: { a : 0, b : 0, c : 0, d : 0, e : 0, f : 0, g : 0, h : 0 },
      section3: { a : 0, b : 0, c : 0, d : 0, e : 0, f : 0, g : 0, h : 0 },
      section4: { a : 0, b : 0, c : 0, d : 0, e : 0, f : 0, g : 0, h : 0 },
      section5: { a : 0, b : 0, c : 0, d : 0, e : 0, f : 0, g : 0, h : 0 },
      section6: { a : 0, b : 0, c : 0, d : 0, e : 0, f : 0, g : 0, h : 0 },
      section7: { a : 0, b : 0, c : 0, d : 0, e : 0, f : 0, g : 0, h : 0 },
      error: false, // Prevent changing page if there's an error
      showResults: false, // Only show the results when the questionnaire has been answered
      results: []
    });
  }
  choosePage = currentSectionNumber => { // Which page to render
    switch(currentSectionNumber){
      case 0: return <LandingPage
        exampleData = {QuestionData.sections[0]}
        answers = {this.state.section0}
        />
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return <QuestionPage
          key = {currentSectionNumber}
          data = {QuestionData.sections[currentSectionNumber]}
          onChange = {this.updateAnswers(currentSectionNumber)}
          answers = {this.state[`section${currentSectionNumber}`]}
        />
      default: // Just in case
        console.error('Invalid section: Section', currentSectionNumber, 'does not exist'); 
    }
  };

  nextButtonHandler = () => {
    this.setState(
      (prevState, props) => {
        const error = !this.validateAnswers(prevState[`section${prevState.currentSectionNumber}`])
        if (error) return { error } // Can't click next if there's an error!
        return {
          currentSectionNumber: prevState.currentSectionNumber + 1, // Next page
          error : false
        };
      });
  }

  prevButtonHandler = () => {
    this.setState(
      (prevState, props) => {
        return {
          currentSectionNumber: prevState.currentSectionNumber - 1, // Previous page
          error : false
        };
      });
  }

submitButtonHandler = () => {
  const error = !this.validateAnswers(this.state[`section${this.state.currentSectionNumber}`]);
  if (error) {
    this.setState({error})
    return; // Can't submit if there's an error
  }

  const results = this.calculateResults();
  fetch('/user/test', { // Save results to the database
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ results })
    })
    .catch(err => console.log(`An error occurred: ${err}`))

    this.setState({ results, showResults: true }); // TODO: put into .then of fetch
}

calculateResults = () => {
  const { section1, section2, section3, section4, section5, section6, section7 } = this.state;
  const results = [
    section1.g + section2.a + section3.h + section4.d + section5.b + section6.f + section7.e,
    section1.d + section2.b + section3.a + section4.h + section5.f + section6.c + section7.g,
    section1.f + section2.e + section3.c + section4.b + section5.d + section6.g + section7.a,
    section1.c + section2.g + section3.d + section4.e + section5.h + section6.a + section7.f,
    section1.a + section2.c + section3.f + section4.g + section5.e + section6.h + section7.d,
    section1.h + section2.d + section3.g + section4.c + section5.a + section6.e + section7.b,
    section1.b + section2.f + section3.e + section4.a + section5.c + section6.b + section7.h,
    section1.e + section2.h + section3.b + section4.f + section5.g + section6.d + section7.c,
  ];

  console.assert(results.reduce((acc, curr) => acc + curr) === 70, 'Results do not sum to 70!'); // Quick check
  return results
}

  validateAnswers = answers => {
    let total = 0;
    for (const key in answers) {
      if (answers < 0) return false // Can't be negative
      if (answers > 10) return false // Can't be too big
      total += answers[key];
    }
    return total === 10; // Total must be exactly equal to 10
  }

  updateAnswers = currentSectionNumber => (data, part) => {
    const currentSection = this.state[`section${currentSectionNumber}`];
    currentSection[part] = data; // new incoming data

    this.setState({
      [`section${currentSection}`] : currentSection,
      error : false
    });
  }

  render() {
    const { currentSectionNumber, results, showResults } = this.state;
    return (
      <div className='Questionnaire'>
        {showResults ? 
          <ResultsPage results={results} /> : // results page
          this.choosePage(currentSectionNumber) // normal question page
        }

        {!showResults && currentSectionNumber > 0 && // Previous button
          <input className='PrevButton' id='PrevButton' type='button' value='Prev' onClick={this.prevButtonHandler} />}
        {!showResults && currentSectionNumber < 7 && // Next button
          <input className='NextButton' id='NextButton' type='button' value='Next' onClick={this.nextButtonHandler} />}
        {!showResults && currentSectionNumber === 7 && // Submit button
          <input className='SubmitButton' id='SubmitButton' type='button' value='Submit' onClick={this.submitButtonHandler} />}          
        {!showResults && this.state.error && <span className='error'>
          Distribute a total of 10 points among the statements
        </span> }
        {!showResults && currentSectionNumber < 8 && // Progress bar
          <progress value={currentSectionNumber} max={8}></progress>}
      </div>
    );
  }
}

export default Questionnaire;
