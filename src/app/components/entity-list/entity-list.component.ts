import { EntityService } from './../../services/entity.service';
import { EntityResponseDTO } from './../../models/entity';
import { RecordsResponse,QueryFilter} from '../../models/response';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {
  entities: EntityResponseDTO[] = [];
  filter: QueryFilter = {
    page: 1,
    take: 10,
    ids: '',
    type:'',
    filter:''
  };
  totalRecords: number = 0;

  constructor(private entityService: EntityService, private router: Router,public authService: AuthService) { }

  ngOnInit(): void {
    this.loadEntities();
  }

  loadEntities(): void {
    this.entityService.getAll(this.filter).subscribe((response: RecordsResponse<EntityResponseDTO>) => {
      this.entities = response.items; // Asumiendo que la respuesta tiene la propiedad 'data'
      this.totalRecords = response.total; // Asumiendo que tienes esta propiedad en la respuesta
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/entity/create']);
  }
  editEntity(id: number): void {
    this.router.navigate(['/entity/edit', id]);
  }


  deleteEntity(id: number): void {
    this.entityService.delete(id).subscribe(() => {
      this.loadEntities(); // Recargar la lista después de eliminar
    });
  }

  onSearchChange(searchTerm: string): void {
    this.filter.filter = searchTerm;
    this.loadEntities();
  }

  onPageChange(pageNumber: number): void {
    this.filter.page = pageNumber;
    this.loadEntities();
  }
}