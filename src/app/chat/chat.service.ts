import { Injectable } from '@angular/core';
import { Http } from '@angular/http';




interface httpResponse {
  url: string,
  title: string
}

@Injectable()

export class ChatService {

	constructor (private http: Http) {}


	parseMessage(message){
		let outputJson = {"mentions": [], "emotions": [], "links": []};
		let messageList = message.split(' ');
		var promises = [];
		return new Promise((resolve,reject) => {
			for (var i=0; i< messageList.length; i++) {
				if (messageList[i].indexOf('@') === 0) {
					outputJson.mentions.push(messageList[i].substring(1).split(/\W+/)[0]);
					promises.push(outputJson);
				} else if (messageList[i].indexOf('(') === 0 && messageList[i].indexOf(')') === messageList[i].length -1) {
					var emotion = messageList[i].replace(/\(|\)/gi,'');
					if (emotion.length <= 15) {
						outputJson.emotions.push(emotion);
						promises.push(outputJson);
					}
				} else if (this.isValidUrl(messageList[i])){
						let p3 = this.getPageHeading(messageList[i]).then((response:httpResponse) => {
							outputJson.links.push({"url": response.url,"title": response.title });
							return outputJson;
						},(err) =>{
							outputJson['error'] = true;
						});
						promises.push(p3);
				} 
			}
			Promise.all(promises).then((res) =>{
				resolve(outputJson);
			});

		});
	
	}


isValidUrl(url) {
	var pattern = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
  if (!pattern.test(url)){
  	return false;
  } else {
  	return true;
  }

}

getPageHeading(url) {
	return new Promise((resolve,reject) => {
		this.http.get('https://cors-anywhere.herokuapp.com/'+url)
			.subscribe((response) => {
				var el = document.createElement('html');
				var frag = document.createDocumentFragment();
				el.innerHTML = response['_body'];
				frag.appendChild(el);
				var firstChild = <HTMLScriptElement>frag.firstChild;
				var title = firstChild.getElementsByTagName('title')[0].textContent;
				resolve({title: title,url:url});
			},
			(err)=>{
				reject(err);
			});
	});
	
}
}