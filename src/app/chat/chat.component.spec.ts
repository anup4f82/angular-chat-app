import { Chat } from './chat';
import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { DebugElement }    from '@angular/core';

import {
  async,
  TestBed,
  fakeAsync,
  ComponentFixture,
  tick,
} from '@angular/core/testing';



describe('Chat', () => {
  let fixture: ComponentFixture<ChatComponent>;
  let comp: ChatComponent;
  let parsedMessage:any = "{ emotions:['emotions'],mentions:['John'] }";
  let de: DebugElement;
  let el: HTMLElement

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        ChatComponent
      ],
      imports: [ FormsModule, HttpModule ],
      providers: [
        { provide: ChatService }
      ]
    });
    fixture = TestBed.createComponent(ChatComponent);
    comp = fixture.componentInstance;
    let chatService = fixture.debugElement.injector.get(ChatService);
    let spy = spyOn(chatService,'parseMessage').and.returnValue(Promise.resolve(parsedMessage));
  });

  it('should create an instance', () => {
    expect(new Chat('')).toBeTruthy();
  });

  it('Should get parsed Message', fakeAsync(() => {
   
    fixture.componentInstance.onSubmit();
    tick();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    console.log(compiled.querySelector('p'));

    expect(compiled.querySelector('p').textContent).toEqual("{ emotions:['emotions'],mentions:['John'] }");
  }));
});
