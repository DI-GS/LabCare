import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const horarioSchema = new Schema({
  profesor: {
    type: Schema.Types.ObjectId,
    ref: 'InternUser',
    required: true
  },
  ciclo: {
    type: String,
    required: true
  },
  horario: [{
    hourRange: {
      startTime: {
        HH: { type: String, required: true },
        mm: { type: String, required: true }
      },
      endTime: {
        HH: { type: String, required: true },
        mm: { type: String, required: true }
      }
    },
    dia_semana: { type: String, required: true },
    build: String,
    career: String,
    grade: String,
    group: String,
    subject: String,
    teacher: String
  }]
});

export const Schedules = model('Schedules', horarioSchema);
