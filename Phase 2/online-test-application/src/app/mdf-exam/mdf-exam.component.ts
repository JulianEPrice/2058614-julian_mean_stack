import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mdf-exam',
  templateUrl: './mdf-exam.component.html',
  styleUrls: ['./mdf-exam.component.css']
})
export class MdfExamComponent implements OnInit {
  myForm: FormGroup;
  questionsAndAnswers = [
    {
      question:"How do you install Angular?", firstAnswer:"No need to install Angular.", secondAnswer:"install angular", thirdAnswer:"npm install -g @angular/cli", fourthAnswer:"npm install angular", correctAnswer:"npm install -g @angular/cli"
    },
    {
      question:"When was Angular released?", firstAnswer:"14 September 2016", secondAnswer:"10 January 2014", thirdAnswer:"8 November 2018", fourthAnswer:"14 November 2016", correctAnswer:"14 September 2016"
    },
    {
      question:"How do you create a new Angular project?", firstAnswer:"create new angular-project", secondAnswer:"ng new angular project-name", thirdAnswer:"new project", fourthAnswer:"ng new project-name", correctAnswer:"ng new project-name"
    },
    {
      question:"How do you install Angular Material?", firstAnswer:"npm install -g @angular/material", secondAnswer:"ng add @angular/material", thirdAnswer:"ng add angular-material", fourthAnswer:"ng -g @angular/material", correctAnswer:"ng add @angular/material"
    },
    {
      question:"What is TypeScript?", firstAnswer:"It's just JavaScript.", secondAnswer:"An addition to Java.", thirdAnswer:"An Addition to C++", fourthAnswer:"JavaScript with Syntax for Types.", correctAnswer:"JavaScript with Syntax for Types."
    }
  ]
  constructor(public form:FormBuilder) { 
    this.myForm = form.group({});
  }

  ngOnInit(): void {
    this.questionsAndAnswers.forEach(q=> {
      this.myForm?.addControl(q.question, this.form.control(""));
    })
  }

  submit() {
    let grade = 0;
    for (let i:number = 0; i < this.questionsAndAnswers.length; i++) {
      console.log(this.myForm.controls[this.questionsAndAnswers[i].question].value); // outputs value of the thing you're clicking on
      console.log("correctAnswer: " + this.questionsAndAnswers[i].correctAnswer);
      let answer = document.getElementById(this.myForm.controls[this.questionsAndAnswers[i].question].value);
      if (this.myForm.controls[this.questionsAndAnswers[i].question].value == this.questionsAndAnswers[i].correctAnswer) {
        grade++;
        if (answer === null) {
        } else {
          answer.style.color = "GREEN";
        }
        console.log("CORRECT");
      } else {
        if (answer === null) {
        } else {
          answer.style.color = "RED";
        }
        console.log("INCORRECT");
      }
    }
    let result = document.getElementById("result");
    if (result === null) {
    } else {
      result.innerHTML = grade + "/" + this.questionsAndAnswers.length;
    }

  }
}
