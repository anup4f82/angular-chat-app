import { TestBed,inject } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { ChatService } from './chat.service';
import { MockBackend } from '@angular/http/testing';


describe('ChatService',() => {

	beforeEach(()=>{

		TestBed.configureTestingModule({
			imports:[HttpModule],
			providers: [
				ChatService,
				{ provide: XHRBackend, useClass: MockBackend }
			]

		})

	})

	describe('parseMessage()',() => {
		it('should parse the Message and return Object', inject([ChatService],(chatService) => {
			let message = '@jon (emotions)';
			chatService.parseMessage(message).then((res)=>{
				expect(res).toEqual(JSON.stringify({"mentions": ["jon"], "emotions": ["emotions"], "links": []}));
			});
		}));

		it('should parse the Message and return Object', 
			inject([ChatService,XHRBackend],(chatService,mockBackend) => {
			let message = 'http://www.google.com';
			const mockResponse = {
        _body: "<!doctype html><title>Google</title></html>"
      };
			chatService.parseMessage(message).then((res)=>{
				expect(res).toEqual(JSON.stringify({"mentions":[],"emotions":[],"links":[{"url":"http://www.google.com","title":"Google"}]}));
			});

		}));
	})

});