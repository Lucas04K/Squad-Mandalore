import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarBottomComponent } from '../../components/navbar-bottom/navbar-bottom.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ExerciseResponseSchema } from '../../shared/generated';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { PrimaryButtonComponent } from '../../components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../components/buttons/secondary-button/secondary-button.component';
import { IconComponent } from '../../components/icon/icon.component';
import customFilter from '../../../utils/custom-filter';
import { ConfirmationModalComponent } from '../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-exercise-overview',
  standalone: true,
  imports: [SidebarComponent, ConfirmationModalComponent, NavbarBottomComponent, NgIf, NgFor, NgClass, UserCardComponent, PrimaryButtonComponent, SecondaryButtonComponent, IconComponent],
  templateUrl: './exercise-overview-page.component.html',
  styleUrl: './exercise-overview-page.component.scss'
})

export class ExerciseOverviewComponent implements OnInit, OnDestroy {
  constructor() { }
  exercises: ExerciseResponseSchema[] = []
  filter: any = {};
  searchValue = "";
  
  modals = {
    createTrainerModal: {
      isActive: false,
    },
    createAthleteModal: {
      isActive: false,
    },
    confirmationModal: {
      isActive: false,
      modalTitle: "Benutzer wirklich löschen?",
      modalDescription: "Mit dieser Aktion wird der ausgewählte Benutzer unwiderruflich gelöscht.",
      primaryButtonText: "Benutzer löschen",
      secondaryButtonText: "Abbrechen",
    }
  }

  getActiveFilters(){
    let counter = 0;
    for (const [key, value] of Object.entries(this.filter)){
      if(this.filter[key] && this.filter[key].filterValue) counter++;
    }
    return counter;
  }

  setFilter(key:string, value:any, valueFullFit: boolean = true){
    if(typeof key === "string"){
      this.filter[key] = {
        filterValue: this.filter[key] && this.filter[key].filterValue == value ? "" : value,
        valueFullFit: valueFullFit,
      }
      return
    }
  }

  customFilterCall(array: any[], options: Object, selectionFullFit: boolean){
    return customFilter(array, options, selectionFullFit);
  }

  changeSearchValue(value: string){
    this.searchValue = value;
  }

  ngOnInit(): void {
    this.exercises = [
      {
        id: "1",
        title: "Push-ups",
        category: { id: "1", title: "Stärke" },
        from_age: 18,
        to_age: 60,
        gold_value: "30 sekunden",
        silver_value: "40 sekunden",
        bronze_value: "50 sekunden",
        created_at: "30.03.2024"
      },
      {
        id: "2",
        title: "Running",
        category: { id: "2", title: "Ausdauer" },
        from_age: 16,
        to_age: 80,
        gold_value: "30 minutes",
        silver_value: "20 minutes",
        bronze_value: "10 minutes",
        created_at: "30.03.2024"
      },
      {
        id: "3",
        title: "Yoga",
        category: { id: "3", title: "Schnelligkeit" },
        from_age: 20,
        to_age: 70,
        gold_value: "60 minutes",
        silver_value: "45 minutes",
        bronze_value: "30 minutes",
        created_at: "30.03.2024"
      }
    ]

    // this.exercises = [];
  }

  ngOnDestroy(): void {

  }
}
