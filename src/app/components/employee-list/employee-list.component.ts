import { EmployeeService } from './../../services/employee.service';
// employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EmployeeResponseDTO } from './../../models/employee';
import { RecordsResponse,QueryFilter} from './../../models/response';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeResponseDTO[] = []; // Almacena la lista de empleados
  filterName: string = ''; // Valor del filtro por nombre
  filter: QueryFilter = { page: 1, take: 12, filter: '', ids: '', type: '' }; // Filtro por defecto
  filteredEmployees: EmployeeResponseDTO[] = []; // Empleados filtrados
  constructor(private employeeService: EmployeeService,
    private router: Router,
    public authService: AuthService) {}

  ngOnInit(): void {
    this.loadEmployees(); // Cargar los empleados al iniciar el componente
  }

  // Método para cargar los empleados
  loadEmployees(): void {
    this.employeeService.getAll(this.filter).subscribe(
      (response: RecordsResponse<EmployeeResponseDTO>) => {
        this.employees = response.items; // Asigna los elementos a la lista
        this.filteredEmployees = this.employees; // Inicialmente, los empleados filtrados son todos
      },
      (error) => {
        console.error('Error al cargar los empleados', error);
      }
    );
  }

  // Método para redirigir a la página de creación
  navigateToCreate(): void {
    this.router.navigate(['/employees/create']);
  }

  // Método para redirigir a la página de edición
  editEmployee(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }

  // Método para eliminar un empleado
  deleteEmployee(id: number): void {
    console.log("Empleado ID:"+ id)
    this.employeeService.delete(id).subscribe(
      (response) => {
        console.log('Empleado eliminado:', response);
        this.loadEmployees(); // Recargar la lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el empleado', error);
      }
    );
  }

  // Método para filtrar empleados por nombre
  filterByName(name: string): void {
    this.filterName = name.toLowerCase(); // Almacena el filtro en minúsculas
    this.filteredEmployees = this.employees.filter(employee =>
      employee.firstName?.toLowerCase().includes(this.filterName) ||
      employee.lastName?.toLowerCase().includes(this.filterName) ||
      employee.email?.toLowerCase().includes(this.filterName) // Filtrar por otros campos si es necesario
    );
  }

  generatePDF(): void {
    const data = document.getElementById('pdfContent'); // Cambia 'pdfContent' por el id del elemento que quieres capturar

    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190; // Ancho de la imagen en el PDF
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('reporte_empleados.pdf');
      });
    }
  }
}
