import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AssetsService } from 'src/app/services/assets.service';

@Component({
  selector: 'app-admin-useful-links',
  templateUrl: './admin-useful-links.component.html',
  styleUrls: ['./admin-useful-links.component.scss']
})
export class AdminUsefulLinksComponent implements OnInit {
  usefulLinks = [];
  editMode = false;

  @Input() visible: boolean;
  @Output() close = new EventEmitter<{}>();

  constructor(private assetsService: AssetsService) { }

  ngOnInit(): void {
    this.getUsefulLinks();
  }

  getUsefulLinks() {
    this.assetsService.getUsefulLinks().subscribe(
      (res: { links }) => {
        this.usefulLinks = res.links;
      },
      (error) => { console.log(error); }
    );
  }

  editConfirmModal() {
    if (this.editMode === false) {
      this.editMode = true;
    } else {
      this.editMode = false;
      this.assetsService.editUsefulLinks(this.usefulLinks).subscribe(() => {});
    }
  }

  updateLink(subjectIndex: number, linkIndex: number, e: Event) {
    // @ts-ignore
    this.usefulLinks[subjectIndex].content[linkIndex].url = e.target.value;
  }

  updateTitle(subjectIndex: number, linkIndex: number, e: Event) {
    // @ts-ignore
    this.usefulLinks[subjectIndex].content[linkIndex].title = e.target.value;
  }

  updateDescription(subjectIndex: number, linkIndex: number, e: Event) {
    // @ts-ignore
    this.usefulLinks[subjectIndex].content[linkIndex].description = e.target.value;
  }

  addSubject(subjectIndex: number) {
    const indexOfNewSubject = subjectIndex === 0 ? 0 : this.usefulLinks.length;

    const emptySubject = {
      title: '',
      content: []
    };
    this.usefulLinks.splice(indexOfNewSubject, 0, emptySubject);
  }

  updateSubject(subjectIndex: number, e: Event) {
    // @ts-ignore
    this.usefulLinks[subjectIndex].title = e.target.value;
  }

  removeSubject(subjectIndex: number) {
    this.usefulLinks.splice(subjectIndex, 1);
  }

  addLink(subjectIndex: number) {
    const subjectsList = this.usefulLinks[subjectIndex].content;
    const emptyLink = { title: '', description: '', url: '' };
    subjectsList.push(emptyLink);
    this.usefulLinks[subjectIndex].content = subjectsList;
  }

  removeLink(subjectIndex: number, linkIndex: number) {
    const linksList = this.usefulLinks[subjectIndex].content;
    linksList.splice(linkIndex, 1);
    this.usefulLinks[subjectIndex].content = linksList;
    if (linksList.length === 0) {
      this.usefulLinks.splice(subjectIndex, 1);
    }
  }

  closeModal() {
    this.editMode = false;
    this.close.next();
  }

  // 3 - Fetch liste liens
  // 4 - Update liste liens
  // 6 - Back get / update liens
  // 7 - Confirmation modal
  // 8 - Remove constants UsefulLinks
}
