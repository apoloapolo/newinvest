package com.project.stocks.repository;

import com.project.stocks.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    Optional<Stock> findByNameAndDate(String name, LocalDate date);

    @Query("SELECT stocks " +
            "FROM Stock stocks " +
            "WHERE stocks.name = :name AND stocks.date = :date AND stocks.id <> :id ")
    Optional<Stock> findByStockUpdate(String name, LocalDate date, Long id);

    @Query("SELECT stocks " +
            "FROM Stock stocks " +
            "WHERE stocks.date = :date ")
    Optional<List<Stock>> findByToday(LocalDate date);
}
