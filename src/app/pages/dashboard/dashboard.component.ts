import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarBottomComponent } from '../../components/navbar-bottom/navbar-bottom.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import Athlete from '../../models/athlete';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { PrimaryButtonComponent } from '../../components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../components/buttons/secondary-button/secondary-button.component';
import { IconComponent } from '../../components/icon/icon.component';
import customFilter from '../../../utils/custom-filter';
import Result from '../../models/result';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, NavbarBottomComponent, NgIf, NgFor, NgClass, UserCardComponent, PrimaryButtonComponent, SecondaryButtonComponent, IconComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private router: Router) { }
  athletes: Athlete[] = []
  selectedAthlete: Athlete | null = null;
  routeSubscription!: Subscription;
  showDetails = false;
  filter: any = {};

  getActiveFilters(){
    let counter = 0;
    for (const [key, value] of Object.entries(this.filter)){
      if(this.filter[key]) counter++;
    }
    return counter;
  }

  getTrackingDates(results: Result[]){
    const trackingDates : string[] = [];
    for(const result of results){
      if(!trackingDates.find(date => date === result.tracked_at)) trackingDates.push(result.tracked_at);
    }
    return trackingDates;
  }

  getTrackingTrainers(results: Result[]){
    const trackingTrainers: string[] = [];
    for(const result of results){
      if(!trackingTrainers.find(trainer => trainer === result.tracked_by)) trackingTrainers.push(result.tracked_by);
    }
    return trackingTrainers;
  }

  setFilter(key:string, value:string){
    // if(this.filter[key]) delete this.filter[key];
    // else this.filter[key] = value;
    this.filter[key] = this.filter[key] == value ? "" : value;
    console.log("filter option: ", this.filter);
  }

  customFilterCall(array: any[], options: Object, fullFit:boolean = false){
    console.log(array, options);
    return customFilter(array, options, fullFit);
  }

  triggerDetailsByValue(value: boolean){
    this.showDetails = value;
  }

  getRandomNumber(){
    return Math.floor(Math.random() * 100) + 1;
  }
  getRandomMedalStatus() {
    const medalStatusOptions = ["none", "gold", "silver", "bronze"];
    const randomIndex = Math.floor(Math.random() * medalStatusOptions.length);
    return medalStatusOptions[randomIndex];
  }
  getColorVariable(medal: string){
    const colorMap: any  = {
      none: "var(--brand-400)",
      gold: "var(--gold)",
      silver: "var(--silver)",
      bronze: "var(--bronze)"
    }
    return colorMap[medal] ?? "transparent";
  }
  dashArray: number = 525;

  dashOffset(athlete: Athlete): number {
    const progressDecimal = athlete.progress / 100;
    return this.dashArray * (1 - progressDecimal);
  }

  ngOnInit(): void {
    this.athletes = [{
      id: 1,
      username: 'test1',
      email: 'test1@example.com',
      firstname: 'John',
      lastname: 'Doe',
      created_at: '2024-02-26',
      created_by: "kay_schulz1",
      gender: "männlich",
      last_password_change: '2024-02-26',
      last_edited_at: '2024-02-26',
      date_of_birth: '2003-02-26',
      type: 'Sportler',
      has_swimming_certificate: false,
      progress: this.getRandomNumber(),
      progress_points: 8,
      progress_medal: this.getRandomMedalStatus(),
      number_bronze_medals: 0,
      number_silver_medals: 0,
      number_gold_medals: 0,
      results: [
        {
          id: 1,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 2,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 3,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 4,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        }
      ]
    },{
      id: 2,
      username: 'test2',
      email: 'test1@example.com',
      firstname: 'Jane',
      lastname: 'Doe',
      created_at: '2024-02-26',
      created_by: "kay_schulz1",
      gender: "weiblich",
      last_password_change: '2024-02-26',
      last_edited_at: '2024-02-26',
      date_of_birth: '2003-02-26',
      type: 'Sportler',
      number_bronze_medals: 0,
      number_silver_medals: 0,
      number_gold_medals: 0,
      has_swimming_certificate: false,
      progress: this.getRandomNumber(),
      progress_points: 8,
      progress_medal: this.getRandomMedalStatus(),
      results: [
        {
          id: 1,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 2,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 3,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 4,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        }
      ]
    },{
      id: 3,
      username: 'test1',
      email: 'test1@example.com',
      firstname: 'Jimmy',
      lastname: 'Doe',
      created_at: '2024-02-26',
      created_by: "kay_schulz1",
      gender: "männlich",
      last_password_change: '2024-02-26',
      last_edited_at: '2024-02-26',
      date_of_birth: '2003-02-26',
      type: 'Sportler',
      number_bronze_medals: 0,
      number_silver_medals: 0,
      number_gold_medals: 0,
      has_swimming_certificate: false,
      progress: this.getRandomNumber(),
      progress_points: 8,
      progress_medal: this.getRandomMedalStatus(),
      results: [
        {
          id: 1,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 2,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 3,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 4,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 5,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "16.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 6,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 7,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 8,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 9,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 10,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 11,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 12,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 13,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 14,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 15,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz"
        },
        {
          id: 16,
          discipline: "50 Meter Sprint",
          category: "Schnelligkeit",
          score: "08:05 Sekunden",
          medal: "Gold",
          tracked_at: "14.02.2024",
          tracked_by: "Kay Schulz2"
        }
      ]
    },{
      id: 4,
      username: 'test2',
      email: 'test1@example.com',
      firstname: 'Jenny',
      lastname: 'Doe',
      created_at: '2024-02-26',
      created_by: "kay_schulz1",
      gender: "weiblich",
      last_password_change: '2024-02-26',
      last_edited_at: '2024-02-26',
      date_of_birth: '2003-02-26',
      type: 'Sportler',
      number_bronze_medals: 0,
      number_silver_medals: 0,
      number_gold_medals: 0,
      has_swimming_certificate: false,
      progress: this.getRandomNumber(),
      progress_points: 7,
      progress_medal: this.getRandomMedalStatus(),
      results: []
    }]

    for(const athlete of this.athletes){
      athlete.number_gold_medals = customFilter(athlete.results, {medal: "Gold"}).length;
      athlete.number_silver_medals = customFilter(athlete.results, {medal: "Silver"}).length;
      athlete.number_bronze_medals = customFilter(athlete.results, {medal: "Bronze"}).length;
    }
    
    this.routeSubscription = this.route.params.subscribe(params => {
      const athleteId = params['id'];
      if(athleteId){
        this.selectedAthlete = this.athletes.filter(element => element.id == parseInt(athleteId))[0] ?? null
        if(!this.selectedAthlete){
          this.router.navigate(['/athleten']);
        }
      }
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}