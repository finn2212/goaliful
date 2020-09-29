import { Component, OnInit } from '@angular/core';
import { Blogitem } from 'src/app/models/blogItem';
import { TalkServiceService } from '../talk-service.service';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.page.html',
  styleUrls: ['./talk.page.scss'],
})
export class TalkPage implements OnInit {
  bloglist: Blogitem[] = new Array();

  constructor(
    private talkService: TalkServiceService,
    private router: Router) {

  }

  onTalkItemSelected(blogitem: Blogitem) {
    this.talkService.selectedBlogItem = blogitem;
    this.router.navigateByUrl('/tabs/talk/talk-detail');
  }

  ngOnInit() {
    this.getBlogItems();
  }
  getBlogItems() {
    this.bloglist = this.talkService.getBlogItems();
  }

}
