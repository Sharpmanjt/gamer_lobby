import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { LoginButtonComponent } from './users/login-button/login-button.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PlayerListComponent,
        GameListComponent,
        LoginButtonComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-gamer-lobby'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-gamer-lobby');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('angular-gamer-lobby app is running!');
  });
});
