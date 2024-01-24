import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Currency } from 'src/app/global/models';
import { fetchCountries } from 'src/app/global/state/country';
import { fetchDefaultCurrency } from 'src/app/global/state/currency';

@Component({
  selector: 'app-choose-destination',
  templateUrl: './choose-destination.component.html',
  styleUrls: ['./choose-destination.component.scss']
})
export class ChooseDestinationComponent implements OnInit, OnDestroy {

  searchInput = '';
  countryList: Array<any> = [];
  allCountryList: Array<any> = [];
  displayAllCountries = false;

  countries$ = this.store.select(fetchCountries);
  defaultCurrency$ = this.store.select(fetchDefaultCurrency);
  defaultCurrency!: Currency;
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor( private store: Store ) { }

  ngOnInit(): void {
    this.countries$.subscribe((countriesList: any) => {
      this.allCountryList = countriesList;
      this.countryList = this.allCountryList.filter((country : any) => country.isPopular);
    });
    this.defaultCurrency$.pipe(takeUntil(this.destroy$)).subscribe((currency: any) => { 
      if(currency) this.defaultCurrency = currency;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    if(this.destroy$?.complete) this.destroy$.complete();
    if(this.destroy$?.unsubscribe) this.destroy$.unsubscribe();
  }
  
  trackCountries(index: any, item : any) {
    return item._id;
  }

  updateCountyList(event : any){
    if(event.length > 0 && !this.displayAllCountries && this.countryList.length != this.allCountryList.length){
      this.countryList = this.allCountryList;
    } else if(event.length == 0 && !this.displayAllCountries){
      this.countryList = this.allCountryList.filter((country : any) => country.isPopular);
    }
  }

  showAllCountries(){
    this.displayAllCountries = true;
    this.countryList = this.allCountryList;
  }

  onBack(){
    this.countryList = this.allCountryList.filter((country : any) => country.isPopular);
    this.displayAllCountries = false;
  }
}
