package com.in28minutes.restful_web_services.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.in28minutes.restful_web_services.entity.Todo;

@Service
public class ExcelService {

    public ByteArrayInputStream exportTodos(List<Todo> todos) throws IOException {

        try (Workbook workbook = new XSSFWorkbook()) {

            Sheet sheet = workbook.createSheet("History Todos");

            // Header Row
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Sl No");
            header.createCell(1).setCellValue("Description");
            header.createCell(2).setCellValue("Status");
            header.createCell(3).setCellValue("Date");

            int rowIdx = 1;
            int slNo = 1;
            // Data Rows
            for (Todo todo : todos) {

                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(slNo++);

                row.createCell(1).setCellValue(todo.getDescription());

                row.createCell(2).setCellValue(todo.isDone() ? "Complete" : "Incomplete");

                row.createCell(3)
                   .setCellValue(todo.getTargetDate().toString());
            }

            // Auto Size Columns
            for (int i = 0; i < 4; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();

            workbook.write(out);

            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}
